import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/app/components/header";
import React from "react";

export default async function HomePage() {
  const hasSession = (await cookies()).has("swellbeing_user");
  return (
    <main className="flex flex-1 flex-col items-center justify-between py-8 px-4 md:py-16 md:px-8">
      <Header />
      <div className="flex flex-col items-center gap-4">
        <Link className="btn btn-accent" href={hasSession ? "/water" : "/join"}>
          {hasSession ? "Log water intake" : "Get started"}
        </Link>
        <p>
          {hasSession ? "Using another account?" : "Already have your personal key?"}{" "}
          <Link className="link-primary" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
