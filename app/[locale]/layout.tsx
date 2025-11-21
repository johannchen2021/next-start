import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { routing, Link } from "@/i18n/routing";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const requestHeaders = await headers();

  const [messages, session, navT, commonT] = await Promise.all([
    getMessages(),
    auth.api.getSession({
      headers: requestHeaders,
    }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background flex flex-col">
              <header className="border-b">
                <div className="container mx-auto max-w-4xl px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{navT("title")}</h2>
                  <div className="flex items-center gap-4">
                    {session ? (
                      <>
                        <Link href="/profile">
                          <Button variant="outline">
                            {session.user.name} {commonT("profile")}
                          </Button>
                        </Link>
                        <SignOutButton label={commonT("signOut")} />
                      </>
                    ) : (
                      <Link href="/auth">
                        <Button variant="outline">{commonT("signIn")}</Button>
                      </Link>
                    )}
                    <LocaleSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
