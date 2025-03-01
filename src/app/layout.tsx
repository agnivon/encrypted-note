import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils";
import { Metadata } from "next";
import BaseLayout from "@/components/layouts/BaseLayout";
import { siteMetadata } from "@/config/metadata.config";

export const metadata: Metadata = siteMetadata;

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
