import { createHmac } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production');
const TOKEN_EXPIRATION = '7d';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface JWTPayload {
  sub: string;
  telegramId: number;
  username?: string;
  iat: number;
  exp: number;
}

export function verifyTelegramWebAppData(initData: string, botToken: string): TelegramUser | null {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return null;
    }

    urlParams.delete('hash');
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      return null;
    }

    const userJson = urlParams.get('user');
    if (!userJson) {
      return null;
    }

    const user = JSON.parse(userJson) as Omit<TelegramUser, 'auth_date' | 'hash'>;
    const authDate = parseInt(urlParams.get('auth_date') || '0', 10);

    const maxAge = 86400;
    if (Date.now() / 1000 - authDate > maxAge) {
      return null;
    }

    return {
      ...user,
      auth_date: authDate,
      hash,
    };
  } catch {
    return null;
  }
}

export async function createToken(userId: string, telegramId: number, username?: string): Promise<string> {
  return new SignJWT({ telegramId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}
