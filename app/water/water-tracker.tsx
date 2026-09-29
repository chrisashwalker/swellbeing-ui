"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppHeader, DropletIcon, ExitIcon, HomeIcon, PlusIcon } from "../ui";

type Intake = { id: number; user_id: string; volume: number; timestamp: string };
const goal = 2000;

function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dateFromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}
function rangeFor(key: string) {
  const date = dateFromKey(key);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  return { from: start.toISOString(), to: end.toISOString() };
}

export default function WaterTracker() {
  const router = useRouter();
  const [selected, setSelected] = useState(() => dayKey(new Date()));
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const range = rangeFor(selected);
    fetch(`/api/water?from=${encodeURIComponent(range.from)}&to=${encodeURIComponent(range.to)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = (await response.json()) as Intake[] | { error?: string };
        if (response.status === 401) {
          router.replace("/login");
          return;
        }
        if (!response.ok || !Array.isArray(result)) {
          setError(
            !Array.isArray(result)
              ? (result.error ?? "Couldn’t load your water intake.")
              : "Couldn’t load your water intake.",
          );
          return;
        }
        setIntakes(result);
      })
      .catch((requestError: unknown) => {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError"))
          setError("Couldn’t reach the wellbeing service. Try again shortly.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [router, selected]);

  function chooseDate(value: string) {
    if (!value || value > dayKey(new Date())) return;
    setLoading(true);
    setError("");
    setIntakes([]);
    setSelected(value);
  }

  async function addWater(volume: number) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volume }),
      });
      const result = (await response.json()) as Intake | { error?: string };
      if (!response.ok || !("id" in result)) {
        setError(
          "error" in result
            ? (result.error ?? "Couldn’t save your water.")
            : "Couldn’t save your water.",
        );
        return;
      }
      if (dayKey(new Date(result.timestamp)) === selected)
        setIntakes((current) => [...current, result]);
      setCustom("");
    } catch {
      setError("Couldn’t reach the wellbeing service. Try again shortly.");
    } finally {
      setSaving(false);
    }
  }

  async function logOut() {
    await fetch("/api/session", { method: "DELETE" });
    router.replace("/");
    router.refresh();
  }

  const total = intakes.reduce((sum, item) => sum + item.volume, 0);
  const progress = Math.min(100, (total / goal) * 100);
  const selectedDate = dateFromKey(selected);
  const week = useMemo(() => {
    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - ((selectedDate.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }, [selectedDate]);

  return (
    <main className="tracker-page">
      <AppHeader
        action={
          <button className="logout-button" onClick={logOut}>
            <ExitIcon /> Sign out
          </button>
        }
      />
      <div className="tracker-shell">
        <nav className="tracker-nav" aria-label="Main navigation">
          <Link className="nav-home" href="/">
            <HomeIcon /> Home
          </Link>
          <span className="nav-active">
            <DropletIcon /> Water
          </span>
          <div className="nav-message">
            <span>
              <DropletIcon />
            </span>
            <strong>Keep it flowing.</strong>
            <p>Every little sip is a step towards feeling brighter.</p>
          </div>
        </nav>
        <section className="water-content">
          <header className="water-heading">
            <div>
              <p className="eyebrow">A refreshing little ritual</p>
              <h1>Water intake</h1>
              <p>Hydrate your day, one glass at a time.</p>
            </div>
            <span className="water-heading-icon">
              <DropletIcon />
            </span>
          </header>
          <div className="date-label">
            <strong>
              {selectedDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </strong>
            <label>
              Choose date
              <input
                type="date"
                value={selected}
                max={dayKey(new Date())}
                onChange={(event) => chooseDate(event.target.value)}
              />
            </label>
          </div>
          <div className="week-strip">
            {week.map((date) => {
              const key = dayKey(date);
              return (
                <button
                  key={key}
                  disabled={key > dayKey(new Date())}
                  className={selected === key ? "selected" : ""}
                  onClick={() => chooseDate(key)}
                >
                  <span>{date.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                  <strong>{date.getDate()}</strong>
                  {key === dayKey(new Date()) && <i />}
                </button>
              );
            })}
          </div>
          <div className="water-grid">
            <section className="water-card hero-water-card">
              <div className="water-progress">
                <svg viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="67" />
                  <circle
                    className="fill"
                    cx="80"
                    cy="80"
                    r="67"
                    style={{ strokeDasharray: `${progress * 4.21} 421` }}
                  />
                </svg>
                <div>
                  <DropletIcon />
                  <strong>{(total / 1000).toFixed(2).replace(/0$/, "")}</strong>
                  <span>of 2 L</span>
                </div>
              </div>
              <div className="water-summary">
                <span className="eyebrow">Today’s hydration</span>
                <h2>
                  {total >= goal
                    ? "Beautifully hydrated."
                    : total > 0
                      ? "You’re making waves."
                      : "Your first glass awaits."}
                </h2>
                <p>
                  {total >= goal
                    ? "You reached your daily goal. Keep listening to what your body needs."
                    : `${Math.max(0, goal - total).toLocaleString()} ml to go. Every sip counts.`}
                </p>
                <div className="summary-progress">
                  <i style={{ width: `${progress}%` }} />
                </div>
                <small>{Math.round(progress)}% of your daily goal</small>
              </div>
            </section>
            <section className="water-card quick-add">
              <p className="eyebrow">Add a little hydration</p>
              <h2>What did you drink?</h2>
              <div className="glass-options">
                {[250, 350, 500].map((amount) => (
                  <button key={amount} disabled={saving} onClick={() => addWater(amount)}>
                    <span className={`glass glass-${amount}`}>
                      <i />
                    </span>
                    <strong>{amount} ml</strong>
                    <small>
                      {amount === 250 ? "A glass" : amount === 350 ? "A mug" : "A bottle"}
                    </small>
                  </button>
                ))}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const amount = Number(custom);
                  if (amount > 0) void addWater(amount);
                }}
              >
                <label htmlFor="custom-water">Another amount</label>
                <div>
                  <input
                    id="custom-water"
                    type="number"
                    inputMode="decimal"
                    min="1"
                    max="5000"
                    placeholder="e.g. 180"
                    value={custom}
                    onChange={(event) => setCustom(event.target.value)}
                  />
                  <span>ml</span>
                  <button disabled={saving || !custom} aria-label="Add custom water amount">
                    <PlusIcon />
                  </button>
                </div>
              </form>
            </section>
          </div>
          <section className="history-card">
            <div className="history-heading">
              <div>
                <p className="eyebrow">Your little sips</p>
                <h2>Hydration history</h2>
              </div>
              <strong>{total.toLocaleString()} ml total</strong>
            </div>
            {loading ? (
              <p className="empty-state">Loading your water intake…</p>
            ) : intakes.length === 0 ? (
              <p className="empty-state">
                <DropletIcon /> Nothing logged for this day yet. Add your first glass above.
              </p>
            ) : (
              <ol className="intake-list">
                {[...intakes].reverse().map((intake) => (
                  <li key={intake.id}>
                    <span className="intake-icon">
                      <DropletIcon />
                    </span>
                    <div>
                      <strong>{intake.volume.toLocaleString()} ml</strong>
                      <span>
                        {new Date(intake.timestamp).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <span>Added</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
          {error && (
            <p className="form-error tracker-error" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>
      <nav className="mobile-nav">
        <Link href="/">
          <HomeIcon /> Home
        </Link>
        <span>
          <DropletIcon /> Water
        </span>
      </nav>
    </main>
  );
}
