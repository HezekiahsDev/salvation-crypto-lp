import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "salvation.admin@salvationacademy.net";
  const plainPassword = "P@ssw0rd123!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log(
    "Admin user created/verified successfully. u: salvation.admin@salvationacademy.net p: P@ssw0rd123!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
