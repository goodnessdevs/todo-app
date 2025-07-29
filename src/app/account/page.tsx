"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Corrupted user data", err);
        toast.error("Session error. Please log in again.");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      toast.success("Logged out successfully");
      router.push("/login");
    } else {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await fetch("/api/auth/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user?.id }),
    });
    if (res.ok) {
      toast.success("Account deleted");
      router.push("/login");
    } else {
      toast.error("Unvailable to delete account. Please try again");
    }
  };

  return (
    <main className="max-w-xl mx-auto py-12 px-4">
      <Card className="shadow-xl rounded-2xl border bg-white p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        <CardContent className="flex flex-col sm:flex-row gap-4 mt-4">
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-900">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <DialogFooter className="mt-4">
                <Button
                  className="bg-gray-400"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Yes, delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </main>
  );
}
