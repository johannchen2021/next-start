import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  // Clear existing data
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Johnson",
      posts: {
        create: [
          {
            title: "Getting started with Next.js",
            content: "Learn how to build modern web applications with Next.js.",
          },
          {
            title: "Prisma ORM Guide",
            content:
              "A comprehensive guide to using Prisma for database management.",
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Smith",
      posts: {
        create: [
          {
            title: "shadcn/ui Components",
            content:
              "Beautiful, accessible React components built with Tailwind CSS.",
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded with sample data");
  console.log("Users created:", [user1, user2]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
