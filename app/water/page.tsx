import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WaterTracker from "./water-tracker";

export const metadata: Metadata = { title: "Water intake" };

export default async function WaterPage() {
  if (!(await cookies()).has("swellbeing_user")) redirect("/login");
  return <WaterTracker />;
}
