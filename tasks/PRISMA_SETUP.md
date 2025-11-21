# Prisma Setup Guide

## Overview

Prisma ORM has been set up with **PostgreSQL** using a local Prisma dev instance for local development. The connection uses the Prisma dev server running on `localhost:51214`.

## Key Files

- **`prisma/schema.prisma`** - Database schema definition with User and Post models
- **`lib/prisma.ts`** - Prisma Client singleton instance
- **`prisma/seed.ts`** - Database seed script with sample data
- **`.env`** - Environment variables (DATABASE_URL points to local Prisma Postgres dev instance)
- **`prisma/migrations/`** - Migration history

## Available Commands

### Database Management

```bash
# Start local Prisma Postgres dev instance
pnpm exec prisma dev

# Run migrations (update schema)
pnpm db:migrate

# Open Prisma Studio (visual database browser)
pnpm db:studio

# Seed the database with sample data
pnpm db:seed

# Push schema changes (without migrations)
pnpm db:push

# List Prisma dev instances
pnpm exec prisma dev ls

# Stop Prisma dev instance
pnpm exec prisma dev stop default
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

1. Start the local Prisma Postgres dev instance:

```bash
pnpm exec prisma dev
```

2. Run migrations:

```bash
pnpm db:migrate
```

3. Seed the database (optional):

```bash
pnpm db:seed
```

4. Visit `http://localhost:3000/api/users` to see the data in JSON format

## Using Prisma Studio

```bash
pnpm db:studio
```

This opens a visual GUI to browse and edit your database at `http://localhost:5555`

## Local Prisma Dev Instance

The setup uses **Prisma's local development PostgreSQL server** which runs on your machine:

- **Port Range**: 51214-51216
- **Connection String**: `postgresql://postgres:postgres@localhost:51214/template1`
- **Data Storage**: `.prisma/` directory in the project

### Starting and Managing the Dev Instance

```bash
# Start the instance
pnpm exec prisma dev

# List all instances
pnpm exec prisma dev ls

# Stop the instance
pnpm exec prisma dev stop default

# Remove an instance's data
pnpm exec prisma dev rm default
```

## Switching to a Production PostgreSQL Database

To use a remote PostgreSQL database:

1. Update `.env`:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

2. The `prisma/schema.prisma` already has:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:

```bash
pnpm exec prisma migrate deploy
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Local Development](https://www.prisma.io/docs/orm/tools-and-interfaces/prisma-cli/commands#dev)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization)
- [Prisma Studio](https://www.prisma.io/studio)
