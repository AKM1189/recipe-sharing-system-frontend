import axios, { type AxiosInstance } from "axios";
import { endpoints } from "../endpoints";
import { clearCookies, getCookie, setCookie } from "../cookieHandler";
import { authConstants } from "../constants";
import { navigateToLogin } from "../utils";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie(authConstants.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  originalRequest: any;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.originalRequest.headers.Authorization = `Bearer ${token}`;
      prom.resolve(api(prom.originalRequest));
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ① Access token expired (408)
    if (error?.response?.status === 408 && !originalRequest._retry) {
      const refreshToken = getCookie(authConstants.refreshToken);

      if (!refreshToken) {
        clearCookies();
        navigateToLogin();
        return Promise.reject(error);
      }

      // FLAG: prevent multiple refresh calls
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post(
          endpoints.auth.refresh + "?refreshToken=" + refreshToken,
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data?.data?.tokens || {};

        setCookie(authConstants.accessToken, accessToken);
        setCookie(authConstants.refreshToken, newRefreshToken);

        // Process queue AFTER refresh is successful
        processQueue(null, accessToken);
        isRefreshing = false;

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh itself failed → logout all
        processQueue(err, null);
        isRefreshing = false;

        clearCookies();

        navigateToLogin();

        return Promise.reject(err);
      }
    }

    // ② Refresh token expired → logout
    if (error?.response?.status === 401) {
      clearCookies();
      navigateToLogin();
    }

    return Promise.reject(error);
  },
);
