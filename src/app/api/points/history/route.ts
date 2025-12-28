import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { paginationSchema } from '@/lib/validations/schemas';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return ApiErrors.unauthorized();
    }

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

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          amount: true,
          balance: true,
          reference: true,
          createdAt: true,
        },
      }),
      prisma.transaction.count({ where: { userId } }),
    ]);

    return successResponse({
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return ApiErrors.internalError();
  }
}
