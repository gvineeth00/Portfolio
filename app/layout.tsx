import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vineeth Golla | AI/ML Engineer and Software Engineer",
  description:
    "AI/ML engineering, model evaluation, inference, distributed systems, and production ML infrastructure. The portfolio of Vineeth Golla.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
