import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';

const BANKRUPTCY_THRESHOLD = 50;
const BANKRUPTCY_RELIEF_AMOUNT = 500;
const BANKRUPTCY_COOLDOWN_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true, points: true },
      });

      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }

      if (user.points >= BANKRUPTCY_THRESHOLD) {
        throw new Error('NOT_BANKRUPT');
      }

      const cooldownStart = new Date();
      cooldownStart.setHours(cooldownStart.getHours() - BANKRUPTCY_COOLDOWN_HOURS);

      const recentRelief = await tx.dailyReward.findFirst({
        where: {
          userId,
          type: 'BANKRUPTCY_RELIEF',
          claimedAt: { gte: cooldownStart },
        },
        orderBy: { claimedAt: 'desc' },
      });

      if (recentRelief) {
        const nextAvailable = new Date(recentRelief.claimedAt);
        nextAvailable.setHours(nextAvailable.getHours() + BANKRUPTCY_COOLDOWN_HOURS);
        throw { message: 'COOLDOWN', nextAvailable };
      }

      await tx.dailyReward.create({
        data: {
          userId,
          type: 'BANKRUPTCY_RELIEF',
          amount: BANKRUPTCY_RELIEF_AMOUNT,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { points: { increment: BANKRUPTCY_RELIEF_AMOUNT } },
        select: { points: true },
      });

      await tx.transaction.create({
        data: {
          userId,
          type: 'BANKRUPTCY_RELIEF',
          amount: BANKRUPTCY_RELIEF_AMOUNT,
          balance: updatedUser.points,
        },
      });

      return {
        relief: BANKRUPTCY_RELIEF_AMOUNT,
        newBalance: updatedUser.points,
        cooldownHours: BANKRUPTCY_COOLDOWN_HOURS,
      };
    });

    return successResponse(result, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'USER_NOT_FOUND') {
        return ApiErrors.notFound('User');
      }
      if (error.message === 'NOT_BANKRUPT') {
        return ApiErrors.notEligible(`Points must be below ${BANKRUPTCY_THRESHOLD} to claim relief`);
      }
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const err = error as { message: string; nextAvailable?: Date };
      if (err.message === 'COOLDOWN' && err.nextAvailable) {
        return ApiErrors.alreadyClaimed(err.nextAvailable);
      }
    }
    console.error('Error claiming bankruptcy relief:', error);
    return ApiErrors.internalError();
  }
}
