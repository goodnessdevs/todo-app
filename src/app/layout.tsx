import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: true,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased min-h-screen flex flex-col`}>
          <Navbar />
          <main className="z-10 py-16 flex-grow">{children}</main>
          <Footer />
          <Toaster richColors closeButton />
      </body>
    </html>
  );
}
