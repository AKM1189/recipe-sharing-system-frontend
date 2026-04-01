import {
  EmailUpdateBody,
  PasswordUpdateBody,
  ProfileUpdateBody,
} from "@/types";
import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const updateEmail = async (userId: string, body: EmailUpdateBody) => {
  const response = await api.post(
    `${endpoints.users}/${userId}/email/update`,
    body,
  );
  return response.data;
};

export const updateProfile = async (
  userId: string,
  body: ProfileUpdateBody,
) => {
  const response = await api.post(
    `${endpoints.users}/${userId}/profile/update`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const updatePassword = async (
  userId: string,
  body: PasswordUpdateBody,
) => {
  const response = await api.post(
    `${endpoints.users}/${userId}/password/update`,
    body,
  );
  return response.data;
};
