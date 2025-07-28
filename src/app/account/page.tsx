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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  id: string 
  name: string
  email: string
}

export default function AccountPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>();

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
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full sm:w-auto bg-gray-400"
          >
            Logout
          </Button>

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
