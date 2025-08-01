'use client';

import React from "react";
import TaskList from "./components/TaskList";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token"); // or check auth context/state
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="w-full mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Tasks Page</h1>
      <p className="text-gray-400 text-center mt-2 text-xl">
        Here you can manage your tasks.
      </p>
      <div className="mx-auto mt-10">
        <TaskList />
      </div>
    </div>
  );
}
