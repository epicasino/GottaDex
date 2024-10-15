import prisma from './db';

async function deleteRecords() {
  const deletedRecords = await prisma.user.deleteMany();

  console.log(deletedRecords);
}

deleteRecords();

// ts-node --compiler-options \"{\"module\":\"CommonJS\"}\" prisma/deleteAll.ts
