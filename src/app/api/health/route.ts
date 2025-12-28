import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { successResponse } from '@/lib/api/response';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    return successResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: {
        code: 'UNHEALTHY',
        message: 'Database connection failed',
      },
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
    }, { status: 503 });
  }
}
