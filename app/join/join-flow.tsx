"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, KeyIcon } from "../ui";

export default function JoinFlow() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function createAccount() {
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/users", { method: "POST" });
      const result = (await response.json()) as { key?: string; error?: string };
      if (!response.ok || !result.key) {
        setError(result.error ?? "We couldn’t create your account.");
        return;
      }
      setKey(result.key);
    } catch {
      setError("We couldn’t reach the wellbeing service. Try again shortly.");
    } finally {
      setPending(false);
    }
  }

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
    } catch {
      setError("Copying was blocked. Select the key and save it manually.");
    }
  }

  return (
    <section className="auth-card join-card">
      <div className="auth-icon">
        <KeyIcon />
      </div>
      {key ? (
        <>
          <p className="eyebrow">Your personal key</p>
          <h1>Save this before you continue.</h1>
          <p className="auth-intro">
            This UUID is your password and the only way back into your account. Swellbeing cannot
            recover it for you.
          </p>
          <div className="issued-key">
            <code>{key}</code>
            <button type="button" onClick={copyKey}>
              {copied ? "Copied" : "Copy key"}
            </button>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <Link className="primary-button" href="/water">
            I’ve saved my key <ArrowIcon />
          </Link>
        </>
      ) : (
        <>
          <p className="eyebrow">A fresh little start</p>
          <h1>Create your private space.</h1>
          <p className="auth-intro">
            No name or email is needed. We’ll give you one personal UUID that acts as your password.
          </p>
          <button className="primary-button" onClick={createAccount} disabled={pending}>
            {pending ? "Creating your space…" : "Create my account"}
            <ArrowIcon />
          </button>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <p className="auth-switch">
            Already have your key? <Link href="/login">Sign in</Link>
          </p>
        </>
      )}
    </section>
  );
}
