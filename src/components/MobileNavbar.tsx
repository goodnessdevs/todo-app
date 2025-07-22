import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SheetNavbar() {
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
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <Separator className="" />

        <div className="space-y-2 p-4 bg-white font-semibold rounded-xl w-full">
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors font-medium"
          >
            Create
          </Link>
          <Link
            href="/tasks"
            className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors font-medium"
          >
            Tasks
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors font-medium"
          >
            Contact
          </Link>

          {!isLoggedIn ? (
            <div className="mt-4 mx-4">
              <Link href="/login">
                <Button className="bg-white text-blue-950 flex justify-between items-center gap-x-2">
                  Sign in <User className="text-blue-800 w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="ms-4 mt-4">
              <Dialog>
                <DialogTrigger className="flex justify-between items-center rounded-md p-1.5 gap-x-2 bg-blue-800 text-white">
                  Sign out <LogOut className="text-white w-4 h-4" />
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
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MobileNavbar() {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-blue-900 shadow-md dark:bg-zinc-950">
      <h2 className="text-white text-xl font-semibold">Geetask</h2>
      <SheetNavbar />
    </div>
  );
}
