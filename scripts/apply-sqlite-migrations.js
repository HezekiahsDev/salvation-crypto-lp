/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const migrationsDir = path.join(process.cwd(), "prisma", "migrations");

function splitSql(sql) {
  const withoutLineComments = sql
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  return withoutLineComments
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function canIgnoreMigrationError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("already exists") ||
    message.includes("duplicate column name") ||
    message.includes("duplicate column")
  );
}

async function ensureMigrationsTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `);
}

async function hasMigration(migrationName) {
  const rows = await prisma.$queryRawUnsafe(
    'SELECT "migration_name" FROM "_prisma_migrations" WHERE "migration_name" = ? LIMIT 1',
    migrationName,
  );
  return rows.length > 0;
}

async function recordMigration(migrationName, checksum, steps) {
  await prisma.$executeRawUnsafe(
    `INSERT OR IGNORE INTO "_prisma_migrations"
      ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count")
      VALUES (?, ?, CURRENT_TIMESTAMP, ?, NULL, NULL, CURRENT_TIMESTAMP, ?)`,
    crypto.randomUUID(),
    checksum,
    migrationName,
    steps,
  );
}

async function main() {
  if (!fs.existsSync(migrationsDir)) {
    console.log("No prisma/migrations directory found.");
    return;
  }

  await ensureMigrationsTable();

  const migrations = fs
    .readdirSync(migrationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const migrationName of migrations) {
    const migrationPath = path.join(migrationsDir, migrationName, "migration.sql");
    if (!fs.existsSync(migrationPath)) continue;

    if (await hasMigration(migrationName)) {
      console.log(`Skipping ${migrationName}; already recorded.`);
      continue;
    }

    const sql = fs.readFileSync(migrationPath, "utf8");
    const statements = splitSql(sql);
    let appliedSteps = 0;

    console.log(`Applying ${migrationName}...`);

    for (const statement of statements) {
      try {
        await prisma.$executeRawUnsafe(statement);
        appliedSteps += 1;
      } catch (error) {
        if (!canIgnoreMigrationError(error)) {
          throw error;
        }
        console.log(`Ignoring already-applied statement in ${migrationName}.`);
      }
    }

    const checksum = crypto.createHash("sha256").update(sql).digest("hex");
    await recordMigration(migrationName, checksum, appliedSteps);
  }

  console.log("SQLite migrations are up to date.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
