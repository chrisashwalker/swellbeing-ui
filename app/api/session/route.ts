import { cookies } from "next/headers";
import { apiRequest, errorResponse } from "../../lib/api";
import { normaliseUuid } from "../../lib/validation";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { key?: unknown };
    const userId = normaliseUuid(body.key);
    if (!userId)
      return Response.json(
        { error: "Enter a complete UUID, including the hyphens." },
        { status: 400 },
      );
    await apiRequest(`/users/${encodeURIComponent(userId)}`);
    (await cookies()).set("swellbeing_user", userId, cookieOptions);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError)
      return Response.json({ error: "Invalid request." }, { status: 400 });
    return errorResponse(error);
  }
}

export async function DELETE() {
  (await cookies()).delete("swellbeing_user");
  return new Response(null, { status: 204 });
}
