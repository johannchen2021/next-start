"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export type ResetPasswordState = {
  status: "idle" | "success" | "error";
  errorCode?: "mismatch" | "tooShort" | "noAccount" | "unknown";
};

type ResetPasswordFormProps = {
  action: (
    prevState: ResetPasswordState,
    formData: FormData
  ) => Promise<ResetPasswordState>;
};

const initialState: ResetPasswordState = { status: "idle" };

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
  const t = useTranslations("profile.resetPassword");
  const [state, formAction, pending] = useActionState(action, initialState);

  const showMessage = state.status === "success" || state.status === "error";
  const isSuccess = state.status === "success";
  const messageText = isSuccess
    ? t("success")
    : state.status === "error"
    ? t(state.errorCode ?? "unknown")
    : "";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground">
          {t("newPasswordLabel")}
        </label>
        <input
          type="password"
          name="newPassword"
          minLength={8}
          required
          autoComplete="new-password"
          className="mt-2 w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground">
          {t("confirmPasswordLabel")}
        </label>
        <input
          type="password"
          name="confirmPassword"
          minLength={8}
          required
          autoComplete="new-password"
          className="mt-2 w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {showMessage && (
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            isSuccess
              ? "border border-green-200 bg-green-50 text-green-700"
              : "border border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {messageText}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? t("pending") : t("submit")}
      </Button>
    </form>
  );
}
