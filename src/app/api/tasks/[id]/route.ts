import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> } 
) {
  const { id } = await context.params;

  const { completed } = await req.json();

  try {
    
    const updated = await prisma.task.update({
      where: { id }, // Find the task by its ID
      data: { completed }, // Update its 'completed' status
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
