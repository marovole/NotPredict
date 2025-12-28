const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface SendMessageOptions {
  chatId: number | string;
  text: string;
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  replyMarkup?: InlineKeyboardMarkup;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
}

interface TelegramResponse<T> {
  ok: boolean;
  result?: T;
  description?: string;
}

export async function sendMessage(options: SendMessageOptions): Promise<boolean> {
  if (!BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN not configured, skipping notification');
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: options.chatId,
        text: options.text,
        parse_mode: options.parseMode || 'HTML',
        reply_markup: options.replyMarkup,
      }),
    });

    const data: TelegramResponse<unknown> = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data.description);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

export function createDeepLink(path: string): string {
  const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'NotPredictBot';
  return `https://t.me/${botUsername}?startapp=${encodeURIComponent(path)}`;
}

export const NotificationTemplates = {
  betWon: (amount: number, topicTitle: string, newBalance: number) => ({
    text: `🎉 <b>恭喜赢得预测！</b>\n\n📈 话题: ${topicTitle}\n💰 赢得: <b>${amount.toLocaleString()}</b> 积分\n💳 余额: ${newBalance.toLocaleString()} 积分\n\n继续保持！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '🎯 继续预测', url: createDeepLink('/') },
      ]],
    },
  }),

  betLost: (topicTitle: string, currentBalance: number) => ({
    text: `😔 <b>预测失败</b>\n\n📉 话题: ${topicTitle}\n💳 当前余额: ${currentBalance.toLocaleString()} 积分\n\n别灰心，下次一定！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '🎯 再试一次', url: createDeepLink('/') },
      ]],
    },
  }),

  streakMilestone: (streak: number) => ({
    text: `🔥 <b>连胜里程碑！</b>\n\n你已经连续预测正确 <b>${streak}</b> 次！\n${streak >= 3 ? '💎 已激活 1.2x 加成！' : ''}\n\n继续保持你的预测直觉！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '🔥 继续挑战', url: createDeepLink('/') },
      ]],
    },
  }),

  newHotTopic: (topicTitle: string, participants: number) => ({
    text: `🔥 <b>热门话题！</b>\n\n${topicTitle}\n\n👥 已有 ${participants} 人参与\n\n快来发表你的预测！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '🎯 立即预测', url: createDeepLink('/') },
      ]],
    },
  }),

  dailyReminder: (currentBalance: number) => ({
    text: `👋 <b>每日签到提醒</b>\n\n今天的签到奖励已准备好！\n💳 当前余额: ${currentBalance.toLocaleString()} 积分\n\n领取你的每日奖励吧！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '🎁 领取奖励', url: createDeepLink('/profile') },
      ]],
    },
  }),

  bankruptcyRelief: () => ({
    text: `💸 <b>破产救济可用</b>\n\n你的积分已低于 50！\n可以领取 500 积分的破产救济。\n\n东山再起的机会来了！`,
    replyMarkup: {
      inline_keyboard: [[
        { text: '💰 领取救济', url: createDeepLink('/profile') },
      ]],
    },
  }),
};

export async function notifyUser(
  telegramId: number | string,
  template: keyof typeof NotificationTemplates,
  ...args: Parameters<(typeof NotificationTemplates)[typeof template]>
): Promise<boolean> {
  const templateFn = NotificationTemplates[template] as (...a: unknown[]) => { text: string; replyMarkup?: InlineKeyboardMarkup };
  const { text, replyMarkup } = templateFn(...args);
  
  return sendMessage({
    chatId: telegramId,
    text,
    parseMode: 'HTML',
    replyMarkup,
  });
}
