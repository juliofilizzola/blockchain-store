import { PrismaClient, TypeToken, WalletPayload } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function createUserAndWallet() {
  const count = await prisma.user.count();

  if (count === 0) {
    const readData = fs.readFileSync('./mock/create.json', 'utf-8');

    const data = JSON.parse(readData);
    const user = await prisma.user.createMany({
      data,
    });
    const userData = await prisma.user.findMany();
    const balanceInsert = [ 0, 122, 32323 ];
    const typeTokenInsert = [ TypeToken.dogcoin, TypeToken.ripple, TypeToken.litecoin ];
    const walletInsert = userData.map((value, index)=> ({
      userId: value.id,
      typeToken: typeTokenInsert[index],
      balance: balanceInsert[index]
    }));
    await prisma.wallet.createMany({
      data: walletInsert
    });

  }
}

createUserAndWallet()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });