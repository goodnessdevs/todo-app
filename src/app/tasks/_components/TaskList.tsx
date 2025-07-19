"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Edit3, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Task() {
  interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/tasks`, {
      method: "DELETE", 
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } else {
      console.error("Failed to delete task.");
      toast.error("Server error. Failed to delete task.");
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id} className="mb-4 w-md md:w-2xl mx-auto">
          <div className="flex items-center justify-between w-full">
            <div className="p-4 space-y-1.5">
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
              <CardDescription className="text-sm text-gray-500">
                {new Date(task.date).toLocaleDateString()}
              </CardDescription>
            </div>

            <div className="flex gap-2 p-4">
              <Button onClick={() => handleDelete(task.id)} className="mr-2 bg-red-600 hover:bg-red-800 text-white">
                <Trash />
              </Button>
              <Button>
                <Edit3 />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
