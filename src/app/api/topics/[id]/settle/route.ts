import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { settleTopicSchema } from '@/lib/validations/schemas';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const adminId = request.headers.get('x-admin-id');
    if (!adminId) {
      return ApiErrors.forbidden();
    }

    const { id } = await params;
    const body = await request.json();
    const validation = settleTopicSchema.safeParse(body);

    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten());
    }

    const { outcome } = validation.data;

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const topic = await tx.topic.findUnique({
        where: { id },
        include: {
          bets: {
            include: {
              user: { select: { id: true, points: true, streak: true, maxStreak: true } },
            },
          },
        },
      });

      if (!topic) {
        throw new Error('TOPIC_NOT_FOUND');
      }

      if (topic.status === 'SETTLED') {
        throw new Error('ALREADY_SETTLED');
      }

      if (outcome === 'CANCELLED') {
        for (const bet of topic.bets) {
          await tx.user.update({
            where: { id: bet.userId },
            data: { points: { increment: bet.amount } },
          });

          await tx.bet.update({
            where: { id: bet.id },
            data: { settled: true, won: null, payout: bet.amount },
          });

          const updatedUser = await tx.user.findUnique({
            where: { id: bet.userId },
            select: { points: true },
          });

          await tx.transaction.create({
            data: {
              userId: bet.userId,
              type: 'BET_REFUND',
              amount: bet.amount,
              balance: updatedUser!.points,
              reference: bet.id,
            },
          });
        }

        return tx.topic.update({
          where: { id },
          data: { status: 'CANCELLED', settledAt: new Date() },
        });
      }

      const winningDirection = outcome as 'YES' | 'NO';
      const totalPool = topic.yesPool + topic.noPool;
      const winningPool = winningDirection === 'YES' ? topic.yesPool : topic.noPool;

      const STREAK_MULTIPLIER_THRESHOLD = 3;
      const STREAK_MULTIPLIER = 1.2;

      for (const bet of topic.bets) {
        const won = bet.direction === winningDirection;
        let payout = 0;

        if (won && winningPool > 0) {
          const basePayout = Math.floor((bet.amount / winningPool) * totalPool);
          const newStreak = bet.user.streak + 1;
          const hasStreakBonus = newStreak >= STREAK_MULTIPLIER_THRESHOLD;
          payout = hasStreakBonus ? Math.floor(basePayout * STREAK_MULTIPLIER) : basePayout;
        }

        await tx.bet.update({
          where: { id: bet.id },
          data: { settled: true, won, payout },
        });

        if (won) {
          const newStreak = bet.user.streak + 1;
          await tx.user.update({
            where: { id: bet.userId },
            data: {
              points: { increment: payout },
              streak: newStreak,
              maxStreak: Math.max(newStreak, bet.user.maxStreak),
            },
          });

          const updatedUser = await tx.user.findUnique({
            where: { id: bet.userId },
            select: { points: true },
          });

          await tx.transaction.create({
            data: {
              userId: bet.userId,
              type: 'BET_WON',
              amount: payout,
              balance: updatedUser!.points,
              reference: bet.id,
            },
          });
        } else {
          await tx.user.update({
            where: { id: bet.userId },
            data: { streak: 0 },
          });

          await tx.transaction.create({
            data: {
              userId: bet.userId,
              type: 'BET_LOST',
              amount: 0,
              balance: bet.user.points,
              reference: bet.id,
            },
          });
        }
      }

      return tx.topic.update({
        where: { id },
        data: {
          status: 'SETTLED',
          outcome: winningDirection,
          settledAt: new Date(),
        },
      });
    });

    return successResponse(result);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'TOPIC_NOT_FOUND':
          return ApiErrors.notFound('Topic');
        case 'ALREADY_SETTLED':
          return ApiErrors.conflict('Topic already settled');
      }
    }
    console.error('Error settling topic:', error);
    return ApiErrors.internalError();
  }
}
