import express, { Express } from 'express';

import { PrismaClient } from '@prisma/client';

import {
  UserCreateInputSchema,
  UserUpdateInputSchema,
} from '../prisma/generated/zod/index.js';
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

app.get('/api/v1/users', async (_, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: 'Jane',
      },
      include: {
        userPreference: true,
      },
    });

    if (users.length === 0) {
      throw new Error('User not found');
    }

    res.status(200).json({
      status: 'success',
      count: users.length,
      data: {
        users,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.patch('/api/v1/users/:id', async (req, res, next) => {
  try {
    // const { id } = req.params;
    const userData = UserUpdateInputSchema.parse(req.body);

    const user = await prisma.user.update({
      where: {
        email: 'jane@test.com',
      },
      data: userData,
    });

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);
