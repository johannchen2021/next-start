import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tHome = await getTranslations("home");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/profile">
                  <Button variant="outline">
                    {session.user.name} {tCommon("profile")}
                  </Button>
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link href="/auth">
                <Button variant="outline">{tCommon("signIn")}</Button>
              </Link>
            )}
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {tHome("title")}
          </h1>
        </div>
      </main>
    </div>
  );
}
