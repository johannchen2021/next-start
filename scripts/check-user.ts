import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "bob@example.com" },
    include: {
      accounts: true,
    },
  });

  console.log("User:", JSON.stringify(user, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
