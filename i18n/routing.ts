import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh"],

  // Used when no locale matches
  defaultLocale: "en",

  // Locale prefix strategy: 'as-needed' hides default locale prefix
  localePrefix: "as-needed",
});

// Create navigation helpers
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
