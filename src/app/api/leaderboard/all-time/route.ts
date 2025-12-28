import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { paginationSchema } from '@/lib/validations/schemas';

interface UserWithBetCount {
  id: string;
  username: string | null;
  firstName: string | null;
  photoUrl: string | null;
  points: number;
  streak: number;
  maxStreak: number;
  _count: { bets: number };
}

interface WinCount {
  userId: string;
  _count: number;
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

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { points: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          firstName: true,
          photoUrl: true,
          points: true,
          streak: true,
          maxStreak: true,
          _count: {
            select: { bets: true },
          },
        },
      }),
      prisma.user.count(),
    ]);

    const userIds = users.map((u: UserWithBetCount) => u.id);
    const winCounts = await prisma.bet.groupBy({
      by: ['userId'],
      where: {
        userId: { in: userIds },
        settled: true,
        won: true,
      },
      _count: true,
    });

    const winMap = new Map(winCounts.map((w: WinCount) => [w.userId, w._count]));

    const leaderboard = users.map((user: UserWithBetCount, index: number) => ({
      rank: skip + index + 1,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        photoUrl: user.photoUrl,
      },
      points: user.points,
      streak: user.streak,
      maxStreak: user.maxStreak,
      totalBets: user._count.bets,
      totalWins: winMap.get(user.id) ?? 0,
    }));

    return successResponse({
      leaderboard,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching all-time leaderboard:', error);
    return ApiErrors.internalError();
  }
}
