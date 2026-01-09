import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// OPTIONAL: Test connection immediately
(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to PostgreSQL successfully");
  } catch (err) {
    console.error("❌ Prisma connection failed:", err.message);
    process.exit(1);
  }
})();

export default prisma;
