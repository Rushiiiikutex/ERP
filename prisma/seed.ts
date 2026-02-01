import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords properly
  const hashedPassword = await bcrypt.hash('password', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  // Create regular user
  const user = await prisma.user.upsert({
    where: {
      email: 'test@test.com',
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  // Create admin user
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {
      password: adminPassword,
    },
    create: {
      email: 'admin@admin.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create teacher user
  const teacher = await prisma.user.upsert({
    where: {
      email: 'teacher@teacher.com',
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'teacher@teacher.com',
      name: 'Teacher User',
      password: hashedPassword,
      role: 'TEACHER',
    },
  });

  console.log('Users created/updated:');
  console.log('- Regular User:', user.email, 'Role:', user.role);
  console.log('- Admin User:', admin.email, 'Role:', admin.role);
  console.log('- Teacher User:', teacher.email, 'Role:', teacher.role);
}





main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
