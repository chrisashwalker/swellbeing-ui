import { cookies } from "next/headers";
import { apiRequest, errorResponse } from "../../lib/api";
import { normaliseUuid } from "../../lib/validation";

export async function POST() {
  try {
    const user = (await apiRequest("/users", { method: "POST" })) as { id?: unknown };
    const userId = normaliseUuid(user.id);
    if (!userId) throw new Error("The API returned an invalid user.");
    (await cookies()).set("swellbeing_user", userId, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return Response.json({ key: userId }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
