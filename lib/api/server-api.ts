import { cookies } from "next/headers";
import { RESPONSE_ERROR } from "../constants";

export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      cache: "no-store",
    });
    console.log("response", response);

    if (!response.ok) {
      console.log("fetching error");
      // throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    return {
      data: null,
      error: RESPONSE_ERROR.SERVER_UNREACHABLE,
    };
  }
}
