import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { paginationSchema } from '@/lib/validations/schemas';

interface WeeklyWinner {
  userId: string;
  _sum: { payout: number | null };
  _count: number;
}

interface UserProfile {
  id: string;
  username: string | null;
  firstName: string | null;
  photoUrl: string | null;
  streak: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = paginationSchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    });

    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten());
    }

    const { page, limit } = validation.data;
    const skip = (page - 1) * limit;

    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);

    const weeklyWinners = await prisma.bet.groupBy({
      by: ['userId'],
      where: {
        settled: true,
        won: true,
        createdAt: { gte: weekStart },
      },
      _sum: { payout: true },
      _count: true,
      orderBy: { _sum: { payout: 'desc' } },
      skip,
      take: limit,
    });

    const userIds = weeklyWinners.map((w: WeeklyWinner) => w.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        firstName: true,
        photoUrl: true,
        streak: true,
      },
    });

    const userMap = new Map(users.map((u: UserProfile) => [u.id, u]));

    const leaderboard = weeklyWinners.map((winner: WeeklyWinner, index: number) => ({
      rank: skip + index + 1,
      user: userMap.get(winner.userId),
      weeklyWinnings: winner._sum.payout ?? 0,
      wins: winner._count,
    }));

    const total = await prisma.bet.groupBy({
      by: ['userId'],
      where: {
        settled: true,
        won: true,
        createdAt: { gte: weekStart },
      },
    });

    return successResponse({
      leaderboard,
      weekStart: weekStart.toISOString(),
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching weekly leaderboard:', error);
    return ApiErrors.internalError();
  }
}
