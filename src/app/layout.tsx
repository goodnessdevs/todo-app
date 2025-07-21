import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import LayoutWrapper from "../components/LayoutWrappers";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geetask",
  description: "A simple application to manage your tasks.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased min-h-screen flex flex-col`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
