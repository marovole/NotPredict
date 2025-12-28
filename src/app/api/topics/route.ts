import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { paginationSchema } from '@/lib/validations/schemas';

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

    const [topics, total] = await Promise.all([
      prisma.topic.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.topic.count({ where: { status: 'ACTIVE' } }),
    ]);

    return successResponse({
      topics,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return ApiErrors.internalError();
  }
}
