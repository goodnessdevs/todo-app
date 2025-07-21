"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

export default function Create() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // or check auth context/state
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (new Date().getFullYear() === 2025) {
      setDate(new Date());
    }
  }, []);

  interface Task {
    title: string;
    details: string;
    date: Date;
  }

  const [formData, setFormData] = useState<Task>({
    title: "",
    details: "",
    date: new Date(),
  });

  // Sync selected date into formData
  useEffect(() => {
    if (isValidDate(date)) {
      setFormData((prev) => ({
        ...prev,
        date: date!,
      }));
    }
  }, [date]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isValidDate(formData.date)) {
      toast.error("Please provide a valid date.");
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, date: formData.date.toISOString() }),
    });

    if (response.ok) {
      toast.success("Task created successfully!");
      setFormData({ title: "", details: "", date: new Date() });
      setValue("");
      setDate(undefined);
    } else {
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="my-20">
      <Card className="dark:bg-gray-800 text-gray-950 bg-white max-w-md mx-auto mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="tracking-wide font-semibold text-xl">
            Create a Task
          </CardTitle>
          <CardDescription>
            Use the form below to add a new task to your todo list.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="title"
              value={formData.title}
              type="text"
              placeholder="New task"
              className="w-full p-2 border border-gray-300 rounded"
              required
              onChange={handleChange}
            />
            <textarea
              name="details"
              value={formData.details}
              placeholder="Add details"
              className="w-full p-2 border border-gray-300 rounded"
              rows={2}
              onChange={handleChange}
            ></textarea>

            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <div className="relative flex gap-2">
                  <Input
                    id="date"
                    value={value}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setValue(inputValue);
                      const parsedDate = new Date(inputValue);
                      if (isValidDate(parsedDate)) {
                        setDate(parsedDate);
                        setMonth(parsedDate);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                      >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      alignOffset={-8}
                      sideOffset={10}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(selected) => {
                          setDate(selected);
                          setValue(formatDate(selected));
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <Button type="submit" className="bg-blue-700 hover:bg-blue-900">
              Add Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
