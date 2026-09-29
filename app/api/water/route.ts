import { cookies } from "next/headers";
import { apiRequest, errorResponse } from "../../lib/api";
import { normaliseUuid, normaliseVolume } from "../../lib/validation";

async function currentUser() {
  return normaliseUuid((await cookies()).get("swellbeing_user")?.value);
}

export async function GET(request: Request) {
  try {
    const userId = await currentUser();
    if (!userId)
      return Response.json({ error: "Sign in to view your water intake." }, { status: 401 });
    const source = new URL(request.url).searchParams;
    const query = new URLSearchParams();
    for (const key of ["from", "to"] as const) {
      const value = source.get(key);
      if (value && !Number.isNaN(Date.parse(value))) query.set(key, value);
    }
    const data = await apiRequest(
      `/users/${userId}/water_intakes${query.size ? `?${query.toString()}` : ""}`,
    );
    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const userId = await currentUser();
    if (!userId) return Response.json({ error: "Sign in to save water intake." }, { status: 401 });
    const body = (await request.json()) as { volume?: unknown };
    const volume = normaliseVolume(body.volume);
    if (!volume)
      return Response.json({ error: "Enter an amount between 1 and 5,000 ml." }, { status: 400 });
    const data = await apiRequest(`/users/${userId}/water_intakes`, {
      method: "POST",
      body: JSON.stringify({ volume }),
    });
    return Response.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError)
      return Response.json({ error: "Invalid request." }, { status: 400 });
    return errorResponse(error);
  }
}
