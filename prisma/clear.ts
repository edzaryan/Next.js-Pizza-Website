import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.storyItem.deleteMany();
  await prisma.story.deleteMany();

  console.log("🧹 All Story data cleared successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());