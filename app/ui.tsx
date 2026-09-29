import Link from "next/link";
import type { ReactNode } from "react";

type IconProps = { className?: string };
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand compact" : "brand"}>
      <svg viewBox="0 0 112 78" role="img" aria-label="Swellbeing sun and waves">
        <defs>
          <linearGradient id="sun-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffd75d" />
            <stop offset="1" stopColor="#ffad38" />
          </linearGradient>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#35d3c3" />
            <stop offset="1" stopColor="#038cd7" />
          </linearGradient>
        </defs>
        <g stroke="#ffb62f" strokeWidth="5" strokeLinecap="round">
          <path d="M56 3v9M28 12l5 8M84 12l-5 8M10 33l9 2M102 33l-9 2" />
        </g>
        <circle cx="56" cy="37" r="22" fill="url(#sun-gradient)" />
        <path
          d="M46 35q4-5 8 0M63 35q4-5 8 0M48 44q9 10 18 0"
          fill="none"
          stroke="#063b62"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M7 55q22-24 49-6 25 17 49-5-9 24-32 25-23 1-37-8Q23 54 7 66q12-24 33-20"
          fill="url(#wave-gradient)"
        />
        <path d="M8 69q24-16 44-4 23 14 49 0-17 18-43 11Q29 66 8 74Z" fill="#22bfc5" />
      </svg>
      <strong>Swellbeing</strong>
    </span>
  );
}
function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
export function ArrowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Icon>
  );
}
export function BackIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m14 5-7 7 7 7" />
    </Icon>
  );
}
export function DropletIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
    </Icon>
  );
}
export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
    </Icon>
  );
}
export function MotionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 12h10M3 8v8m4-11v14M21 8v8M17 5v14" />
    </Icon>
  );
}
export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
    </Icon>
  );
}
export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}
export function ExitIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" />
    </Icon>
  );
}
export function KeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8m-3 3 3 3" />
    </Icon>
  );
}
export function Waves() {
  return (
    <svg className="waves" viewBox="0 0 800 360" preserveAspectRatio="none">
      <circle cx="670" cy="135" r="112" fill="#ffe79b" />
      <path d="M0 90C240 20 345 315 800 140v220H0Z" fill="#b7ebee" />
      <path d="M0 165C260 60 390 330 800 205v155H0Z" fill="#74d3e7" />
      <path d="M0 245C230 125 500 390 800 238v122H0Z" fill="#27b7d7" />
      <path d="M0 310C210 205 470 410 800 305v55H0Z" fill="#078fca" />
    </svg>
  );
}
export function AppHeader({ action }: { action?: ReactNode }) {
  return (
    <header className="app-header">
      <Link href="/" aria-label="Swellbeing home">
        <Brand compact />
      </Link>
      {action}
    </header>
  );
}
