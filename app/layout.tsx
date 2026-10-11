import "./globals.css";
import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import React from "react";

const varela = Varela_Round({
  subsets: ["latin"],
  variable: "--font-varela",
  weight: "400",
});

export const metadata: Metadata = {
  title: { default: "Swellbeing", template: "%s | Swellbeing" },
  description: "Simple wellbeing tracking that feels just swell.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${varela.variable}`}>
      <body className="min-h-full flex flex-col m-0 font-sans">{children}</body>
    </html>
  );
}
