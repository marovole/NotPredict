import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        photoUrl: true,
        points: true,
        streak: true,
        maxStreak: true,
        createdAt: true,
        _count: {
          select: {
            bets: true,
          },
        },
      },
    });

    if (!user) {
      return ApiErrors.notFound('User');
    }

    const stats = await prisma.bet.aggregate({
      where: { userId: id, settled: true, won: true },
      _count: true,
    });

    return successResponse({
      ...user,
      totalBets: user._count.bets,
      totalWins: stats._count,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return ApiErrors.internalError();
  }
}
