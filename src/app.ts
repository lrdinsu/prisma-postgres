import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create User
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     email: 'john@gmail.com',
  //   },
  // });

  // Get all users
  // const users = await prisma.user.findMany({
  //   include: {
  //     articles: true,
  //   },
  // });

  // Create article and associate it with user
  // const article = await prisma.article.create({
  //   data: {
  //     title: 'Johns First Article',
  //     body: 'This is Johns first article',
  //     author: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // });

  // Get all articles
  // const articles = await prisma.article.findMany();

  // Create user and article in one go
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Elon Musk',
  //     email: 'elon@gmail.com',
  //     articles: {
  //       create: {
  //         title: 'Elon Musk Article',
  //         body: 'This is Elon Musks article',
  //       },
  //     },
  //   },
  //   include: {
  //     articles: true,
  //   },
  // });

  // Create another article
  // const article = await prisma.article.create({
  //   data: {
  //     title: 'Elon Musk Article 2',
  //     body: 'This is Elon Musks second article',
  //     author: {
  //       connect: {
  //         id: 2,
  //       },
  //     },
  //   },
  // });

  // Loop over elon articles
  // users.forEach((user) => {
  //   console.log(`User: ${user.name}, Email: ${user.email}`);
  //   console.log(`Articles:`);
  //
  //   user.articles.forEach((article) => {
  //     console.log(`-Title: ${article.title}, Body: ${article.body}`);
  //   });
  //   console.log(`\n`);
  // });

  // Update user
  // const user = await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     name: 'John Doe 2',
  //   },
  // });

  // Remove article
  const article = await prisma.article.delete({
    where: {
      id: 2,
    },
  });

  console.log(article);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
