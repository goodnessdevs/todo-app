'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MobileNavbar } from "./MobileNavbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const shouldHide = ["/login", "/signup", "/forgot-password", "/reset-password"].includes(pathName)
  
  return (
    <>
      {!shouldHide && <MobileNavbar />}
      {!shouldHide && <Navbar />}
      <main className="z-10 py-16 flex-grow">{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
