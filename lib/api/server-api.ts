import { cookies } from "next/headers";
import { RESPONSE_ERROR } from "../constants";

export async function serverFetch<T>(
  url: string,
  params?: Record<string, string | number | undefined | null>, // Added params
  options: RequestInit = {},
): Promise<{ data: T | null; error?: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 1. Construct URL with Search Params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = new URL(`${baseUrl}${url}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        fullUrl.searchParams.append(key, String(value));
    });
  }

  try {
    const response = await fetch(fullUrl.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      cache: "no-store",
    });

    // 2. Handle HTTP errors (4xx, 5xx)
    if (!response.ok) {
      return {
        data: null,
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { data: data?.data, error: undefined };
  } catch (err) {
    return {
      data: null,
      error: RESPONSE_ERROR.SERVER_UNREACHABLE,
    };
  }
}
