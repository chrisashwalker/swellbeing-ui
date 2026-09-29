import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader, BackIcon, KeyIcon } from "../ui";
import LoginForm from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="auth-page">
      <AppHeader />
      <section className="auth-card">
        <Link className="back-link" href="/">
          <BackIcon /> Back to welcome
        </Link>
        <div className="auth-icon">
          <KeyIcon />
        </div>
        <p className="eyebrow">Welcome back</p>
        <h1>Your space is waiting.</h1>
        <p className="auth-intro">
          Use your personal UUID to return to your wellbeing data. It works as your one and only
          password.
        </p>
        <LoginForm />
        <aside className="security-note">
          <strong>Keep your key somewhere safe.</strong>
          <p>
            Anyone with this UUID can access your account. A password manager is the best place for
            it.
          </p>
        </aside>
      </section>
    </main>
  );
}
