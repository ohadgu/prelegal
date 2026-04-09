import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PreLegal",
  description: "AI-powered legal document drafting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
