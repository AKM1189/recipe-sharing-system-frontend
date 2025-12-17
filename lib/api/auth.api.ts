import { LoginBody } from "@/types/auth";
import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const login = async (body: LoginBody) => {
  const response = await api.post(endpoints.auth.login, body);
  return response.data;
};

export const signup = async (body: LoginBody) => {
  const response = await api.post(endpoints.auth.signup, body);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get(endpoints.auth.me);
  return response.data;
};

export const logout = async (body: { deviceId: string }) => {
  const response = await api.post(endpoints.auth.logout, body);
  return response.data;
};
