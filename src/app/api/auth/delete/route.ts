import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
    const { id } = await req.json();

    try {
        await prisma.user.delete({
            where: { id },
        });

        const response = NextResponse.json({ message: "Account deleted successfully" },
            { status: 200 })

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: "strict",
            path: "/",
            expires: new Date(0), // expire immediately
        });

        return response
    } catch (err) {
        console.error("Delete error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
