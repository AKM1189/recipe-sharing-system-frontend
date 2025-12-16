import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { routes } from "./routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

export const handlePreviewImage = (file: File | undefined) => {
  if (file) {
    return URL.createObjectURL(file);
  }
};

export const navigateToLogin = () => {
  if (window.location.pathname !== routes.auth.login) {
    window.location.href = routes.auth.login;
  }
};
