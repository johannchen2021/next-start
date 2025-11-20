import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  // Clear existing data (respecting foreign key relationships)
  await prisma.post.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  // await prisma.verificationToken.deleteMany({});
  await prisma.verification.deleteMany({});
  await prisma.user.deleteMany({});

  const user1Id = "yhoZnNsD6ITKNsMhyypbFT7fGH6dK0aa";
  // password hash for "password123"
  const password =
    "9a613b25fee943af5cfb843e24334668:bde08916e1fe9d1d72723c4b46ec1c107d77cf8c5025a811d9182ddfadf599790f71230bda0125a3381d41529afbacac170bca8a1f02457e24b381b8be7b200f";

  const user1 = await prisma.user.create({
    data: {
      id: user1Id,
      email: "bob@gmail.com",
      name: "Bob",
      emailVerified: true,
      accounts: {
        create: {
          id: "2Pfdjf8FB1IjCY6sa9cVdw3tfdKLQSqp",
          accountId: user1Id,
          providerId: "credential",
          // password: await bcrypt.hash("password123", 10),
          password,
        },
      },
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

  console.log("✅ Database seeded with sample data");
  console.log("Users created:", [user1.email]);
  console.log("📧 Test credentials:");
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
