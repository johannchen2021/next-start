import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/routing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { ResetPasswordForm } from "./reset-password-form";
import { resetPasswordAction } from "./action";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const requestHeaders = await headers();

  const [session, t] = await Promise.all([
    auth.api.getSession({
      headers: requestHeaders,
    }),
    getTranslations({ locale, namespace: "profile" }),
  ]);

  if (!session) {
    redirect({ href: "/auth", locale });
  }

  const user = session!.user;
  const resetPassword = resetPasswordAction.bind(null, user.id);

  return (
    <div className="container mx-auto max-w-2xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <span className="block text-sm font-medium text-muted-foreground">
              {t("nameLabel")}
            </span>
            <p className="text-lg">{user.name || t("notSet")}</p>
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium text-muted-foreground">
              {t("emailLabel")}
            </span>
            <p className="text-lg">{user.email}</p>
          </div>

          {user.image && (
            <div className="space-y-2">
              <span className="block text-sm font-medium text-muted-foreground">
                {t("avatarLabel")}
              </span>
              <img
                src={user.image}
                alt={user.name || t("notSet")}
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <span className="block text-sm font-medium text-muted-foreground">
              {t("emailVerifiedLabel")}
            </span>
            <p className="text-lg">
              {user.emailVerified
                ? t("emailVerifiedYes")
                : t("emailVerifiedNo")}
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-6">
            <div>
              <h2 className="text-lg font-semibold">
                {t("resetPassword.title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("resetPassword.description")}
              </p>
            </div>
            <ResetPasswordForm action={resetPassword} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
