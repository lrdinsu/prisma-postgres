import express, { Express } from 'express';
import * as process from 'process';

import { PrismaClient } from '@prisma/client';

export const app: Express = express();

app.use(express.json());

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 24,
        name: 'Kyle',
      },
    },
  });
  console.log(user);
  process.exit(0);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
