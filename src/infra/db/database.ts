/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const connect = async (uri: string): Promise<void> => {
  await db.$connect()
}

export const close = () => db.$disconnect()