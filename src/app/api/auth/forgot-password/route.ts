import { NextRequest, NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/app/utils/email";
import crypto from "crypto";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "If the account exists, reset instructions will be sent." },
        { status: 200 }
      );
    }

    // Generate token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save hashed token and expiration
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiredAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      },
    });

    // Send reset email
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return NextResponse.json({
      success: true,
      message: "If the account exists, reset instructions have been sent.",
    });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
