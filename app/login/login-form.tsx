"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowIcon } from "../ui";

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const key = String(new FormData(event.currentTarget).get("key") ?? "");
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "We couldn’t sign you in.");
        return;
      }
      router.replace("/water");
      router.refresh();
    } catch {
      setError("We couldn’t reach the wellbeing service. Try again shortly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <label htmlFor="personal-key">Personal key</label>
      <p className="field-hint">Paste the UUID you saved when you joined.</p>
      <div className="key-field">
        <input
          id="personal-key"
          name="key"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "login-error" : undefined}
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          required
        />
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          aria-label={show ? "Hide personal key" : "Show personal key"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && (
        <p className="form-error" id="login-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary-button" disabled={pending}>
        {pending ? "Checking your key…" : "Sign in"}
        <ArrowIcon />
      </button>
    </form>
  );
}
