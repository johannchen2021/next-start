"use server";

import type { ResetPasswordState } from "./reset-password-form";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import { hashPassword } from "better-auth/crypto";

export async function resetPasswordAction(
  userId: string,
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!userId) {
    return { status: "error", errorCode: "unknown" };
  }

  if (!newPassword || !confirmPassword) {
    return { status: "error", errorCode: "unknown" };
  }

  if (newPassword.length < 8) {
    return { status: "error", errorCode: "tooShort" };
  }

  if (newPassword !== confirmPassword) {
    return { status: "error", errorCode: "mismatch" };
  }

  try {
    const hashedPassword = await hashPassword(newPassword);

    await prisma.account.update({
      where: {
        providerId_accountId: {
          providerId: "credential",
          accountId: userId,
        },
      },
      data: {
        password: hashedPassword,
      },
    });

    return { status: "success" };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { status: "error", errorCode: "noAccount" };
    }

    console.error("Failed to reset password", error);
    return { status: "error", errorCode: "unknown" };
  }
}
