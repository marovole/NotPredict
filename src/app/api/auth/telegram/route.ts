import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { successResponse, ApiErrors } from '@/lib/api/response';
import { verifyTelegramWebAppData, createToken } from '@/lib/auth/telegram';
import { z } from 'zod';

const authSchema = z.object({
  initData: z.string().min(1),
});

const WELCOME_BONUS = 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = authSchema.safeParse(body);

    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten());
    }

    const { initData } = validation.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not configured');
      return ApiErrors.internalError();
    }

    const telegramUser = verifyTelegramWebAppData(initData, botToken);

    if (!telegramUser) {
      return ApiErrors.unauthorized();
    }

    let user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramUser.id) },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await prisma.user.create({
        data: {
          telegramId: BigInt(telegramUser.id),
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          photoUrl: telegramUser.photo_url,
          points: WELCOME_BONUS,
        },
      });

      await prisma.transaction.create({
        data: {
          userId: user.id,
          type: 'WELCOME_BONUS',
          amount: WELCOME_BONUS,
          balance: WELCOME_BONUS,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          photoUrl: telegramUser.photo_url,
        },
      });
    }

    const token = await createToken(user.id, telegramUser.id, telegramUser.username);

    return successResponse({
      token,
      user: {
        id: user.id,
        telegramId: user.telegramId.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        points: user.points,
        streak: user.streak,
        isNewUser,
      },
    });
  } catch (error) {
    console.error('Error in Telegram auth:', error);
    return ApiErrors.internalError();
  }
}
