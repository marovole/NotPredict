import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        telegramId: true,
        username: true,
        firstName: true,
        lastName: true,
        photoUrl: true,
        points: true,
        streak: true,
        maxStreak: true,
        referralCode: true,
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
      where: { userId, settled: true, won: true },
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

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

    const body = await request.json();
    const allowedFields = ['username', 'firstName', 'lastName', 'photoUrl'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in body && typeof body[field] === 'string') {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return ApiErrors.validationError({ message: 'No valid fields to update' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        photoUrl: true,
        updatedAt: true,
      },
    });

    return successResponse(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return ApiErrors.internalError();
  }
}
