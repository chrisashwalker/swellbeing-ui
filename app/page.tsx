import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowIcon, Brand, DropletIcon, HeartIcon, MotionIcon, Waves } from "./ui";

export default async function WelcomePage() {
  const hasSession = (await cookies()).has("swellbeing_user");
  return (
    <main className="welcome-page">
      <header className="welcome-header">
        <Brand />
        <p className="welcome-kicker">
          <span /> A little care, every day
        </p>
      </header>
      <section className="welcome-content">
        <div className="welcome-copy">
          <p className="eyebrow">Your wellbeing starts with you</p>
          <h1>
            Small steps to a <em>brighter you.</em>
          </h1>
          <p className="welcome-lede">
            Track your health, hydrate your days, and feel the difference.
          </p>
          <ul className="welcome-benefits" aria-label="Swellbeing benefits">
            <li>
              <HeartIcon /> Feel better
            </li>
            <li>
              <DropletIcon /> Hydrate well
            </li>
            <li>
              <MotionIcon /> Move more
            </li>
          </ul>
          <div className="welcome-actions">
            <Link className="primary-button" href={hasSession ? "/water" : "/join"}>
              {hasSession ? "Continue to my day" : "Get started"}
              <ArrowIcon />
            </Link>
            <p>
              {hasSession ? "Using another account?" : "Already have your personal key?"}{" "}
              <Link href="/login">Sign in</Link>
            </p>
          </div>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <div className="hero-mark">
            <Brand />
          </div>
          <div className="floating-card care-card">
            <HeartIcon />
            <span>
              A little care<strong>A happier you</strong>
            </span>
          </div>
          <div className="floating-card progress-card">
            <span className="check">✓</span>
            <span>
              One day at a time<strong>Progress feels good</strong>
            </span>
          </div>
          <Waves />
        </div>
      </section>
      <footer className="welcome-footer">
        <span>Your wellbeing. At your pace.</span>
        <span>Made for your everyday.</span>
      </footer>
    </main>
  );
}
