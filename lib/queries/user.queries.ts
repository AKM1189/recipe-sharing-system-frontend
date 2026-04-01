import {
  EmailUpdateBody,
  PasswordUpdateBody,
  ProfileUpdateBody,
} from "@/types";
import { errorToast, successToast } from "../handleToast";
import { updateEmail, updatePassword, updateProfile } from "../api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: ({ userId, body }: { userId: string; body: EmailUpdateBody }) =>
      updateEmail(userId, body),
    onSuccess: (data) => {
      successToast(data);
    },
    onError: (error) => {
      errorToast(error, "Email sending failed!");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string;
      body: ProfileUpdateBody;
    }) => updateProfile(userId, body),
    onSuccess: (data) => {
      successToast(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      errorToast(error, "Profile updating failed!");
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string;
      body: PasswordUpdateBody;
    }) => updatePassword(userId, body),
    onSuccess: (data) => {
      successToast(data);
    },
    onError: (error) => {
      errorToast(error, "Profile updating failed!");
    },
  });
};
