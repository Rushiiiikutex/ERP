import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash the password properly
  const hashedPassword = await bcrypt.hash('password', 10);
  
  const user = await prisma.user.upsert({
    where: {
      email: 'test@test.com',
    },
    update: {
      password: hashedPassword, // update with hashed password
    },
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: hashedPassword, // properly hashed password
    },
  });

  console.log('User created/updated:', user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
