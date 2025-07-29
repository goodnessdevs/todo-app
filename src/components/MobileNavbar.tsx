import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, ListTodo, Loader2, LogOut, Menu, Plus, User } from "lucide-react";
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
import Brand from "./Brand";

export default function SheetNavbar() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSheetVisibility = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <Separator />

        <div className="space-y-4 p-4 bg-white font-semibold rounded-xl w-full">
          <Link href="/">
            <Button onClick={handleSheetVisibility} className="flex justify-start px-4 py-2 rounded-lg mb-4 bg-blue-800 cursor-pointer hover:bg-blue-100 w-full text-start hover:text-blue-600 transition-colors font-medium">
              <Home /> Home
            </Button>
          </Link>
          <Link href="/create">
            <Button onClick={handleSheetVisibility} className="flex justify-start px-4 py-2 rounded-lg mb-4 bg-blue-800 cursor-pointer hover:bg-blue-100 w-full text-start hover:text-blue-600 transition-colors font-medium">
              <Plus /> Create
            </Button>
          </Link>
          <Link href="/tasks">
            <Button onClick={handleSheetVisibility} className="flex justify-start px-4 py-2 rounded-lg mb-4 bg-blue-800 cursor-pointer hover:bg-blue-100 w-full text-start hover:text-blue-600 transition-colors font-medium">
              <ListTodo /> Tasks
            </Button>
          </Link>
          <Link href="/account">
            <Button onClick={handleSheetVisibility} className="flex justify-start px-4 py-2 rounded-lg mb-4 bg-blue-800 cursor-pointer hover:bg-blue-100 w-full text-start hover:text-blue-600 transition-colors font-medium">
              <User /> Account
            </Button>
          </Link>

          {!isLoggedIn ? (
            <div className="mt-8 ">
              <Link href="/login">
                <Button className="text-center w-full text-white flex justify-center items-center gap-x-2">
                  Sign in <User className="text-blue-500 w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              <Dialog>
                <DialogTrigger className="text-center w-full flex justify-center items-center rounded-md p-1.5 gap-x-2 bg-slate-900 hover:bg-slate-700 text-white">
                  Sign out <LogOut className="text-white w-4 h-4" />
                </DialogTrigger>


                <DialogContent className="space-y-4 w-sm ">
                  <DialogHeader>
                    <DialogTitle className="text-center mt-5">
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
      <Brand />
      <SheetNavbar />
    </div>
  );
}
