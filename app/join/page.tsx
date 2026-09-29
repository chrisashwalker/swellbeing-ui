import type { Metadata } from "next";
import { AppHeader } from "../ui";
import JoinFlow from "./join-flow";

export const metadata: Metadata = { title: "Get started" };

export default function JoinPage() {
  return (
    <main className="auth-page">
      <AppHeader />
      <JoinFlow />
    </main>
  );
}
