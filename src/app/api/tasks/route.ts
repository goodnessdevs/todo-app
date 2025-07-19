import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// create task
export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, date } = body;

  if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Title, description, and date are required." },
        { status: 400 }
      );
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format." },
        { status: 400 }
      );
    }

  try {
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        date: parsedDate,
      }
    });

    return NextResponse.json(newTask, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task." },
      { status: 500 }
    );
  }
}

// get all tasks
export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks." },
      { status: 500 }
    );
  }
}

// edit task
export async function PUT(req: Request) {
  const { id, title, description } = await req.json();
  if (!id || !title || !description) {
    return NextResponse.json(
      { error: "Task ID, title, and description are required." },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 }
    );
  }
}

// delete task
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Task ID is required." },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.delete({
      where: {
        id
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 }
    );
  }
}
