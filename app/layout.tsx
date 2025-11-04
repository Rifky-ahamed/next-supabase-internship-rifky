import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js + Supabase Internship Project",
  description: "Learning Next.js fundamentals with shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-8">{children}</div>
      </body>
    </html>
  );
}
