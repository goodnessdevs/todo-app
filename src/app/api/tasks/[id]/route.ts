import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const { completed } = await req.json();

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
