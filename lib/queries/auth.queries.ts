import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, signup } from "../api/auth.api";
import { errorToast, successToast } from "../handleToast";
import { clearCookies, getCookie } from "../cookieHandler";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error: any) => {
      errorToast(error, "Invalid Credentials");
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onError: (error: any) => {
      errorToast(error, "Signup Failed");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
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
      window.location.reload();
    },
    onError: (error: any) => {
      console.log(error);
      errorToast(error, "Signup Failed");
    },
  });
};
