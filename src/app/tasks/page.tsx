import React from "react";
import TaskList from "./_components/TaskList";

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Tasks Page</h1>
      <p className="text-gray-400 text-center mt-2 text-xl">
        Here you can manage your tasks.
      </p>
      <div className="max-w-2xl mx-auto mt-10">
        <TaskList />
      </div>
    </div>
  );
}
