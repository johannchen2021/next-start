"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

type Locale = "en" | "zh";

const localeNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = (params.locale as Locale) || "en";
  const nextLocale: Locale = currentLocale === "en" ? "zh" : "en";

  const switchLocale = () => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    // Add the new locale
    const newPath = `/${nextLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switchLocale}
      title={`Switch to ${localeNames[nextLocale]}`}
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Switch language</span>
    </Button>
  );
}
