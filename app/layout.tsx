import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Swellbeing", template: "%s · Swellbeing" },
  description: "Simple, encouraging wellbeing tracking for every day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
