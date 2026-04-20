import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PreLegal — Mutual NDA Creator",
  description: "Create and download a professional Mutual Non-Disclosure Agreement",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
