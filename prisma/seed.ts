import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Clean the database (optional but helpful)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create a Category
  const category = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  });

  // 3. Create some Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Mechanical Keyboard',
        description: 'RGB Backlit mechanical keyboard with brown switches.',
        price: 89.99,
        stock: 50,
        categoryId: category.id,
        images: ['https://via.placeholder.com/300'],
      },
      {
        name: 'Wireless Mouse',
        description: 'High-precision optical sensor with 4000 DPI.',
        price: 45.00,
        stock: 120,
        categoryId: category.id,
        images: ['https://via.placeholder.com/300'],
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });