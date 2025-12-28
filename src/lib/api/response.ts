import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> = {
  success: true;
  data: T;
} | {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    { success: false, error: { code, message, details } },
    { status }
  );
}

export const ApiErrors = {
  unauthorized: () => errorResponse('UNAUTHORIZED', 'Authentication required', 401),
  forbidden: () => errorResponse('FORBIDDEN', 'Access denied', 403),
  notFound: (resource: string) => errorResponse('NOT_FOUND', `${resource} not found`, 404),
  conflict: (message: string) => errorResponse('CONFLICT', message, 409),
  validationError: (details: unknown) => errorResponse('VALIDATION_ERROR', 'Invalid request data', 400, details),
  internalError: () => errorResponse('INTERNAL_ERROR', 'An unexpected error occurred', 500),
  rateLimited: () => errorResponse('RATE_LIMITED', 'Too many requests', 429),
  insufficientPoints: () => errorResponse('INSUFFICIENT_POINTS', 'Not enough points', 400),
  alreadyBet: () => errorResponse('ALREADY_BET', 'Already placed a bet on this topic', 409),
  topicNotActive: () => errorResponse('TOPIC_NOT_ACTIVE', 'Topic is not active', 400),
  alreadyClaimed: (nextAvailable: Date) => 
    errorResponse('ALREADY_CLAIMED', 'Already claimed today', 409, { nextAvailable }),
  notEligible: (reason: string) => errorResponse('NOT_ELIGIBLE', reason, 400),
};
