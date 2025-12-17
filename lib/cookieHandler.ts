import Cookies from "js-cookie";
import { authConstants } from "./constants";

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value);
};

export const removeCookie = (key: string | string[]) => {
  if (typeof key === "string") {
    Cookies.remove(key);
  }
  if (Array.isArray(key) && key?.length > 0) {
    key.map((item: string) => Cookies.remove(item));
  }
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const clearCookies = () => {
  removeCookie([
    authConstants.accessToken,
    authConstants.refreshToken,
    authConstants.deviceId,
  ]);
};
