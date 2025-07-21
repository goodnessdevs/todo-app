"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit3, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Task() {
  interface Task {
    id: number;
    title: string;
    details: string;
    date: string;
    completed: boolean;
  }
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    setLoading(true); // start loading
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        console.error("Unexpected data format:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false); // stop loading
    }
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

  const toggleCompleted = async (taskId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, completed: !currentStatus } : task
          )
        );
        toast.success("Task updated");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="mb-4 w-md md:w-2xl mx-auto">
            <div className="flex items-center justify-between w-full">
              <div className="p-3 space-y-1.5">
                <CardTitle>{task.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {task.details}
                </CardDescription>
                <CardDescription className="text-sm text-gray-600">
                  {new Date(task.date).toLocaleDateString()}
                </CardDescription>
                <div className="text-sm font-semibold flex items-center gap-x-2 mt-2 text-blue-900">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() =>
                      toggleCompleted(task.id, task.completed)
                    }
                  />
                  {task.completed ? "Completed" : "Mark as done"}
                </div>
              </div>

              <div className="flex gap-2 p-4">
                <Button
                  onClick={() => handleDelete(task.id)}
                  className="mr-2 bg-red-600 hover:bg-red-800 text-white"
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </>
  );
}
