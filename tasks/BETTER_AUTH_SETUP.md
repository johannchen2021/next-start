# Better Auth Setup Guide

## Overview

Better Auth has been set up with:

- Email/Password authentication
- Google OAuth 2.0 social login
- Prisma database adapter
- PostgreSQL database
- User sessions and accounts management

## Key Files

- **`lib/auth.ts`** - Server-side Better Auth configuration
- **`lib/auth-client.ts`** - Client-side Better Auth client
- **`app/api/auth/[...all]/route.ts`** - Auth API routes handler
- **`app/auth/page.tsx`** - Authentication page (sign in/sign up)
- **`app/profile/page.tsx`** - User profile page
- **`prisma/schema.prisma`** - Database schema with auth tables

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret

### 2. Configure Environment Variables

Update your `.env` file:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:51214/template1"

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_client_id_here"
GOOGLE_CLIENT_SECRET="your_client_secret_here"
```

### 3. Start the Application

```bash
# Start Prisma dev (if not already running)
pnpm exec prisma dev

# Run migrations (if needed)
pnpm db:migrate

# Start the Next.js app
pnpm dev
```

### 4. Test Authentication

1. Visit `http://localhost:3000/auth`
2. Test email/password sign up
3. Test Google OAuth sign in
4. Visit `http://localhost:3000/profile` to see your profile

## Available Routes

- `/` - Home page
- `/auth` - Authentication page (sign in/sign up)
- `/profile` - User profile page (protected)
- `/api/auth/[...all]` - Better Auth API endpoints

## Database Models

### User

- `id` - Unique identifier (UUID)
- `name` - User's full name
- `email` - User's email (unique)
- `emailVerified` - Email verification status
- `image` - User's profile image URL
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Account

- `id` - Unique identifier
- `accountId` - Social provider's account ID
- `providerId` - Social provider (e.g., "google")
- `userId` - Link to User
- `accessToken` - OAuth access token
- `refreshToken` - OAuth refresh token
- `idToken` - OAuth ID token
- `accessTokenExpiresAt` - Token expiration
- `refreshTokenExpiresAt` - Refresh token expiration

### Session

- `id` - Unique identifier
- `token` - Session token (unique)
- `userId` - Link to User
- `expiresAt` - Session expiration
- `createdAt` - Session creation timestamp

### VerificationToken

- `id` - Unique identifier
- `token` - Verification token
- `identifier` - Email or identifier being verified
- `expiresAt` - Token expiration

## Client-Side Usage

### useSession Hook

```typescript
import { useSession } from "@/lib/auth-client";

export function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;

  return <div>Welcome, {session?.user.name}</div>;
}
```

### Sign Out

```typescript
import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => router.push("/"),
          },
        })
      }
    >
      Logout
    </button>
  );
}
```

## Security Considerations

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use HTTPS in production** - Required for OAuth
3. **Keep tokens secure** - Better Auth handles token storage securely
4. **Validate on the server** - Always validate user input and sessions
5. **Use environment variables** - Never hardcode credentials

## Production Deployment

### Environment Variables for Production

```env
DATABASE_URL="your_production_database_url"
BETTER_AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_BETTER_AUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="production_client_id"
GOOGLE_CLIENT_SECRET="production_client_secret"
```

### Update Google OAuth Redirect URIs

Add to Google Cloud Console credentials:

- `https://yourdomain.com/api/auth/callback/google`

### Database Migration

```bash
pnpm db:migrate -- deploy
```

## Adding More Social Providers

To add GitHub, Discord, or other providers:

1. Update `lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ... existing config
  socialProviders: {
    google: { ... },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
```

2. Add environment variables to `.env`

3. Restart the application

## Troubleshooting

### "Invalid redirect URI"

- Check that your redirect URI in Google Cloud Console matches your `BETTER_AUTH_URL`
- Ensure it includes `/api/auth/callback/google`

### "Session not found"

- Clear cookies and try again
- Check that the database connection is working

### "Email already in use"

- User already has an account with that email
- They should sign in instead of signing up

## Resources

- [Better Auth Documentation](https://better-auth.com)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
