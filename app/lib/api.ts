import "server-only";

const baseUrl = (process.env.SWELLBEING_API_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function apiRequest(path: string, init?: RequestInit) {
  const token = process.env.SWELLBEING_API_TOKEN;
  if (!token) throw new ApiError(503, "The API connection is not configured.");
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(503, "The wellbeing service is unavailable. Please try again shortly.");
  }
  if (!response.ok) {
    let message =
      response.status === 404
        ? "We couldn’t find an account for that personal key."
        : "The wellbeing service could not complete that request.";
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error && response.status !== 404) message = body.error;
    } catch {}
    throw new ApiError(response.status, message);
  }
  return response.status === 204 ? null : (response.json() as Promise<unknown>);
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError)
    return Response.json({ error: error.message }, { status: error.status });
  return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}
