'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const shouldHide = ["/login", "/signup"].includes(pathName)
  
  return (
    <>
      {!shouldHide && <Navbar />}
      <main className="z-10 py-16 flex-grow">{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
