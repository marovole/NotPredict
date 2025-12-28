import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';

const DAILY_REWARD_AMOUNT = 100;

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

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const existingClaim = await tx.dailyReward.findFirst({
        where: {
          userId,
          type: 'DAILY_CHECKIN',
          claimedAt: { gte: today, lt: tomorrow },
        },
      });

      if (existingClaim) {
        throw new Error('ALREADY_CLAIMED');
      }

      await tx.dailyReward.create({
        data: {
          userId,
          type: 'DAILY_CHECKIN',
          amount: DAILY_REWARD_AMOUNT,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { points: { increment: DAILY_REWARD_AMOUNT } },
        select: { points: true },
      });

      await tx.transaction.create({
        data: {
          userId,
          type: 'DAILY_CHECKIN',
          amount: DAILY_REWARD_AMOUNT,
          balance: updatedUser.points,
        },
      });

      return {
        reward: DAILY_REWARD_AMOUNT,
        newBalance: updatedUser.points,
        nextAvailable: tomorrow,
      };
    });

    return successResponse(result, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'USER_NOT_FOUND') {
        return ApiErrors.notFound('User');
      }
      if (error.message === 'ALREADY_CLAIMED') {
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return ApiErrors.alreadyClaimed(tomorrow);
      }
    }
    console.error('Error claiming daily reward:', error);
    return ApiErrors.internalError();
  }
}
