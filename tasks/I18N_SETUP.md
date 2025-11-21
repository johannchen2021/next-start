# i18n Implementation Instructions

## Setup Complete ✅

The following has been configured:

- ✅ `next-intl` added to package.json
- ✅ Translation files created (messages/en.json, messages/zh.json)
- ✅ i18n configuration created (i18n/request.ts)
- ✅ Middleware for locale routing (middleware.ts)
- ✅ New [locale] layout structure
- ✅ Locale switcher component

## Next Steps - Manual File Moves Required

You need to move your existing pages into the `app/[locale]` folder:

### 1. Move pages to app/[locale]/

```bash
# Create the [locale] structure
mkdir -p app/[locale]/auth
mkdir -p app/[locale]/profile
mkdir -p app/[locale]/admin/database

# Move existing pages
mv app/page.tsx app/[locale]/page.tsx
mv app/auth/page.tsx app/[locale]/auth/page.tsx
mv app/profile/page.tsx app/[locale]/profile/page.tsx
mv app/admin/database/page.tsx app/[locale]/admin/database/page.tsx

# API routes stay in app/api (not moved)
```

### 2. Update imports in moved pages

After moving, update all pages to use translations:

**app/[locale]/page.tsx:**

```typescript
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </div>
  );
}
```

**For server components:**

```typescript
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("home");

  return <h1>{t("title")}</h1>;
}
```

### 3. Add LocaleSwitcher to navigation

In your header/nav component, add:

```typescript
import { LocaleSwitcher } from "@/components/locale-switcher";

// In your JSX:
<LocaleSwitcher />;
```

### 4. Install dependencies

```bash
pnpm install
```

### 5. Test the setup

```bash
pnpm dev
```

Visit:

- http://localhost:3000 (English - default)
- http://localhost:3000/zh (Chinese)

## Translation Keys

Use these keys in your components:

- `t('common.signIn')` - Sign In / 登录
- `t('common.signOut')` - Sign Out / 退出登录
- `t('nav.title')` - Navigation title
- `t('home.title')` - Home page title
- `t('auth.signInTitle')` - Auth page sign in title
- `t('profile.title')` - Profile page title

See `messages/en.json` and `messages/zh.json` for all available keys.

## Locale Switcher

The locale switcher button appears in the navigation and toggles between EN and 中文.

## Important Notes

- API routes (`app/api/*`) should NOT be moved - they stay outside [locale]
- Update all Link components to include locale: `<Link href="/profile">` becomes `<Link href={`/${locale}/profile`}>`
- Or use next-intl's Link: `import {Link} from '@/i18n/routing';`
