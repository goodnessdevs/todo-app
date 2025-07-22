"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Loader2, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Logout failed");

      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed z-50 w-full hidden md:flex items-center justify-evenly p-4 bg-blue-900 text-white">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          quality={100}
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-2xl font-semibold">Geetask</h1>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center font-semibold space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/create">Create</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/tasks">Tasks</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {!isLoggedIn ? (
            <NavigationMenuItem>
              <NavigationMenuLink className="bg-white text-blue-950" asChild>
                <Link href="/login">
                  <span className="flex justify-between items-center gap-x-2">
                    Sign in <User className="text-blue-800 w-4 h-4" />
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Dialog>
                <DialogTrigger className="flex justify-between items-center rounded-md p-1.5 gap-x-2 bg-white text-blue-950">
                  Sign out <LogOut className="text-blue-800 w-4 h-4" />
                </DialogTrigger>

                <DialogContent className="space-y-4 w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Are you sure you want to leave?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-center space-x-4 flex justify-center items-center">
                    <DialogClose className="bg-gray-900 text-sm hover:bg-gray-700 p-2 rounded-md w-[50px] text-white">
                      No
                    </DialogClose>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                          Logging out...
                        </>
                      ) : (
                        "Yes"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
