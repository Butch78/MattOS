import { auth } from '@clerk/nextjs/server';
import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { CreateTransactionRequest } from '@/models/Transaction';

const client = new PrismaClient();

// POST /api/transactions/:id
// Required fields in body: name: string; location: string; askingPrice: number; transactionOwner: string; id: number; createdAt: string; userId: number;
// Optional fields in body: none

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = auth();
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (userId) {
    switch (req.method) {
      case 'GET':
        try {
          const transaction = await client.transaction.findUnique({
            where: { id: Number(req.query.id) },
          });
          if (transaction) {
            return res.status(200).json(transaction);
          } else {
            return res.status(404).json({ message: 'Not found' });
          }
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              // Handle unique constraint violation
              // TODO: Improve error handling
              return res.status(409).json({ message: 'Unique constraint violation, a new user cannot be created with this email' });
            }
          }
          throw e;
        }

      case 'PUT':
        try {
          const result = await client.transaction.update({
            where: { id: Number(req.query.id) },
            data: req.body as CreateTransactionRequest,
          });
          return res.status(200).json(result);
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              // Handle unique constraint violation
              return res.status(409).json({ message: 'Unique constraint violation, a new user cannot be created with this email' });
            }
          }
          throw e;
        }

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    };
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
