import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bets: true },
        },
      },
    });

    if (!topic) {
      return ApiErrors.notFound('Topic');
    }

    return successResponse(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return ApiErrors.internalError();
  }
}
