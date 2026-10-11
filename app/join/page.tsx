import type { Metadata } from "next";
import JoinFlow from "./join-flow";

export const metadata: Metadata = { title: "Get started" };

export default function JoinPage() {
  return (
    <main className="">
      <JoinFlow />
    </main>
  );
}
