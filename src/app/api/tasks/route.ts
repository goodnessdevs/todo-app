import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// create task
export async function POST(req: Request) {
  const body = await req.json();
  const { title, details, date } = body;

  if (!title || !details || !date) {
    return NextResponse.json(
      { error: "Title, details, and date are required." },
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

  const tokenCookie = await cookies();
  const token = tokenCookie.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token required" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    const newTask = await prisma.task.create({
      data: {
        title,
        details,
        date: parsedDate,
        userId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
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
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization token required" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const tasks = await prisma.task.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("JWT or DB error:", error);
    return NextResponse.json(
      { error: "Invalid token or failed to fetch tasks" },
      { status: 401 }
    );
  }
}
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");
//   if (!userId)
//     return NextResponse.json({ error: "User ID required" }, { status: 400 });

//   try {
//     const tasks = await prisma.task.findMany({
//       where: {
//         userId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json(tasks, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks." },
//       { status: 500 }
//     );
//   }
// }


// edit task
export async function PUT(req: Request) {
  const { id, title, details, date, userId } = await req.json();

  if (!id || !title || !details || !userId) {
    return NextResponse.json(
      { error: "Task ID, title, details, and userId are required." },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    if (task.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        details,
        ...(date && { date: new Date(date) }),
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 }
    );
  }
}


// delete task
// export async function DELETE(req: Request) {
//   const body = await req.json();
//   const { id } = body;

//   if (!id) {
//     return NextResponse.json(
//       { error: "Task ID is required." },
//       { status: 400 }
//     );
//   }

//   try {
//     const task = await prisma.task.delete({
//       where: {
//         id,
//       },
//     });
//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     return NextResponse.json(
//       { error: "Failed to delete task." },
//       { status: 500 }
//     );
//   }
// }
export async function DELETE(req: Request) {
  const { id, userId } = await req.json();

  if (!id || !userId) {
    return NextResponse.json(
      { error: "Task ID and userId are required." },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    if (task.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 }
    );
  }
}

