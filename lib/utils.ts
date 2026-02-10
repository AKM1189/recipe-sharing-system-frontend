import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { routes } from "./routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

export function convertMToHM(total: number): {
  hour: number;
  minute: number;
} {
  const hour = Math.floor(total / 60);
  const minute = total & 60;
  return { hour, minute };
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

export const getImageUrl = (key: string | undefined) => {
  if (!key) return "";
  return process.env.NEXT_PUBLIC_IMAGE_URL + key;
};

export const formatLowerCaseName = (category: string) => {
  const arr = category.split(" ");
  if (arr.length > 0) {
    return arr.map((item) => `${item[0].toUpperCase()}${item.slice(1)}`);
  } else category[0].toUpperCase() + category.slice(1);
};
