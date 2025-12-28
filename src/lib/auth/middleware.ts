import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractBearerToken } from './telegram';

export interface AuthenticatedRequest extends NextRequest {
  userId: string;
  telegramId: number;
}

export async function withAuth(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const token = extractBearerToken(request.headers.get('authorization'));
  
  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Missing authorization token' } },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);
  
  if (!payload) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } },
      { status: 401 }
    );
  }

  const authenticatedRequest = request as AuthenticatedRequest;
  authenticatedRequest.userId = payload.sub;
  authenticatedRequest.telegramId = payload.telegramId;

  return handler(authenticatedRequest);
}

export function getUserIdFromRequest(request: NextRequest): string | null {
  const token = extractBearerToken(request.headers.get('authorization'));
  if (!token) {
    return request.headers.get('x-user-id');
  }
  return null;
}
