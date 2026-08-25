import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { adminsCollection, closeDb } from "../src/lib/db";

async function main() {
  const username = "salvation.admin@salvationacademy.net";
  const plainPassword = "P@ssw0rd123!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const now = new Date();
  const admins = await adminsCollection();

  await admins.updateOne(
    { username },
    {
      $setOnInsert: {
        id: crypto.randomUUID(),
        username,
        password: hashedPassword,
        created_at: now,
      },
      $set: {
        updated_at: now,
      },
    },
    { upsert: true },
  );

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
    await closeDb();
  });
