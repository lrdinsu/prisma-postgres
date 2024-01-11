import express, { Express } from 'express';

import { PrismaClient } from '@prisma/client';

import { UserCreateInputSchema } from '../prisma/generated/zod/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app: Express = express();

app.use(express.json());

const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.findUnique({
//     where: {
//       age_name: {
//         age: 24,
//         name: 'Kyle',
//       },
//     },
//   });
//   console.log(user);
//   process.exit(0);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

app.post('/api/v1/users', async (req, res, next) => {
  try {
    const user = UserCreateInputSchema.parse(req.body);
    const newUser = await prisma.user.create({
      data: user,
    });

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);
