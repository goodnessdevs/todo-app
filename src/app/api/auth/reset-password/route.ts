import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { sendResetPasswordSuccessEmail } from "@/emails/email";

export async function PATCH(
  req: NextRequest,
) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and new password are required" },
      { status: 400 }
    );
  }

  try {
    // Hash the token to match the one stored in DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user by the hashed reset token and check expiration
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiredAt: { gt: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiredAt: null,
      },
    });

    // Optionally send confirmation email
    await sendResetPasswordSuccessEmail(user.email, user.name);

    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
