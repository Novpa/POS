import { prisma } from "../src/config/config.prisma";

const categories = [
  { name: "Technology" },
  { name: "Health" },
  { name: "Finance" },
  { name: "Education" },
  { name: "Lifestyle" },
];

async function main() {
  await prisma.category.createMany({ data: categories });
}

main()
  .then(() => console.log("success"))
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
