"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        router.push("/");
      } else {
        if (data?.errors && typeof data.errors === "object") {
          const errorMessages = Object.values(data.errors).flat();

          if (errorMessages.length > 0) {
            toast.error(errorMessages.join("\n"));
            setError(errorMessages[0] as string);
          } else {
            toast.error("Validation failed");
            setError("Validation failed");
          }
        } else {
          const message = data?.error || "Login failed";
          toast.error(message);
          setError(message);
        }
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-sm mx-auto p-6 space-y-4 border rounded-xl shadow-md bg-white">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-2xl font-semibold">Login</h2>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-blue-600 font-semibold hover:font-bold mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            <Link href="/forgot-password" className="hover:text-blue-600">
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 hover:bg-blue-800"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="text-sm text-center font-semibold mt-2 text-gray-700">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 my-2 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
