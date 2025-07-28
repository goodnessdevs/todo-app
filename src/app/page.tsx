"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // prevent SSR mismatch
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (!hasMounted) return <div className="mt-20"><Spinner /></div>;

  return (
    <div className="my-20 md:my-28 md:mx-40 px-10 md:px-0">
      <div className="md:flex mb-44 justify-start items-center md:gap-x-20">
        <div className="md:text-start text-center space-y-6">
          <h1 className="text-7xl font-bold">Build your Todo List</h1>
          <p className="text-gray-700 text-2xl">
            A simple application to manage your tasks.
          </p>

          {isLoggedIn ? (
            <Link href="/create">
              <Button className="bg-blue-700 hover:bg-blue-900 text-xl rounded-full text-white cursor-pointer p-6 animate-bounce">
                Create task
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-700 hover:bg-blue-900 text-xl rounded-full text-white cursor-pointer p-6 animate-bounce">
                Get started
              </Button>
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          <Image
            src="/brand.png"
            alt="Logo"
            quality={100}
            width={400}
            height={400}
            className="object-cover w-full"
          />
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-semibold">Tasks</h2>
        <Separator className="my-2" />

        <div className="relative overflow-hidden rounded-2xl shadow-lg mt-6 group">
          <Image
            src="/tasks.png"
            alt="Tasks"
            quality={100}
            width={800}
            height={400}
            className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
          <p className="absolute bottom-4 left-4 z-20 text-white text-lg font-medium drop-shadow-lg">
            Manage your tasks efficiently with our intuitive interface.
          </p>
        </div>
      </div>
    </div>
  );
}