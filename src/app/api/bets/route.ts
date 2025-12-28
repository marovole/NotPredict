import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { placeBetSchema } from '@/lib/validations/schemas';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

    const body = await request.json();
    const validation = placeBetSchema.safeParse(body);

    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten());
    }

    const { topicId, direction, amount } = validation.data;

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true, points: true },
      });

      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }

      if (user.points < amount) {
        throw new Error('INSUFFICIENT_POINTS');
      }

      const topic = await tx.topic.findUnique({
        where: { id: topicId },
        select: { id: true, status: true },
      });

      if (!topic) {
        throw new Error('TOPIC_NOT_FOUND');
      }

      if (topic.status !== 'ACTIVE') {
        throw new Error('TOPIC_NOT_ACTIVE');
      }

      const existingBet = await tx.bet.findUnique({
        where: { userId_topicId: { userId, topicId } },
      });

      if (existingBet) {
        throw new Error('ALREADY_BET');
      }

      const bet = await tx.bet.create({
        data: {
          userId,
          topicId,
          direction: direction as 'YES' | 'NO',
          amount,
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { points: { decrement: amount } },
      });

      const poolField = direction === 'YES' ? 'yesPool' : 'noPool';
      await tx.topic.update({
        where: { id: topicId },
        data: {
          [poolField]: { increment: amount },
          participants: { increment: 1 },
        },
      });

      const updatedUser = await tx.user.findUnique({
        where: { id: userId },
        select: { points: true },
      });

      await tx.transaction.create({
        data: {
          userId,
          type: 'BET_PLACED',
          amount: -amount,
          balance: updatedUser!.points,
          reference: bet.id,
        },
      });

      return bet;
    });

    return successResponse(result, 201);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'USER_NOT_FOUND':
          return ApiErrors.notFound('User');
        case 'INSUFFICIENT_POINTS':
          return ApiErrors.insufficientPoints();
        case 'TOPIC_NOT_FOUND':
          return ApiErrors.notFound('Topic');
        case 'TOPIC_NOT_ACTIVE':
          return ApiErrors.topicNotActive();
        case 'ALREADY_BET':
          return ApiErrors.alreadyBet();
      }
    }
    console.error('Error placing bet:', error);
    return ApiErrors.internalError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

    const bets = await prisma.bet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
            status: true,
            outcome: true,
          },
        },
      },
    });

    return successResponse(bets);
  } catch (error) {
    console.error('Error fetching bets:', error);
    return ApiErrors.internalError();
  }
}
