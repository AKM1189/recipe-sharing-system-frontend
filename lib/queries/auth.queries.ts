import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, signup } from "../api/auth.api";
import { errorToast, successToast } from "../handleToast";
import { clearCookies } from "../cookieHandler";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login Successful", data);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onError: (error: any) => {
      console.log(error);
      errorToast(error, "Signup Failed");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      successToast(data, "Logout Successful!");
      clearCookies();
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorToast(error, "Signup Failed");
    },
  });
};
