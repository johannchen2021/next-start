# Prisma Setup Guide

## Overview

Prisma ORM has been set up with SQLite for local development. The database file is stored at `dev.db`.

## Key Files

- **`prisma/schema.prisma`** - Database schema definition with User and Post models
- **`lib/prisma.ts`** - Prisma Client singleton instance
- **`prisma/seed.ts`** - Database seed script with sample data
- **`.env`** - Environment variables (DATABASE_URL points to local SQLite)

## Available Commands

### Database Management

```bash
# Run migrations (update schema)
pnpm db:migrate

# Open Prisma Studio (visual database browser)
pnpm db:studio

# Seed the database with sample data
pnpm db:seed

# Push schema changes (without migrations)
pnpm db:push
```

### Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Database Models

### User

- `id` - Primary key (auto-increment)
- `email` - Unique email address
- `name` - Optional user name
- `posts` - Relation to Posts
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Post

- `id` - Primary key (auto-increment)
- `title` - Post title
- `content` - Optional post content
- `authorId` - Foreign key to User
- `author` - Relation to User (with cascade delete)
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

## Example Usage

### In Server Components/API Routes

```typescript
import { prisma } from "@/lib/prisma";

// Fetch all users with their posts
const users = await prisma.user.findMany({
  include: { posts: true },
});

// Create a new user
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "User Name",
  },
});

// Update a user
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" },
});

// Delete a user (cascades to posts)
await prisma.user.delete({
  where: { id: 1 },
});
```

## Testing the Setup

Visit `http://localhost:3000/api/users` to see the seeded data in JSON format.

## Switching to PostgreSQL

To use PostgreSQL instead of SQLite:

1. Update `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

2. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Regenerate and migrate:

```bash
pnpm exec prisma migrate dev --name init
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization)
- [Prisma Studio](https://www.prisma.io/studio)
