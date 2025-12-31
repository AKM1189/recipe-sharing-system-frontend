import { endpoints } from "../endpoints";
import { api } from "./apiConfig";

export const getCategories = async () => {
  const response = await api.get(endpoints.category);
  return response.data;
};
