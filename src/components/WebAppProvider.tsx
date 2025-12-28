'use client';

import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export default function WebAppProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        WebApp.ready();
        WebApp.expand();
        WebApp.enableClosingConfirmation();
        
        WebApp.setHeaderColor('#020617');
        WebApp.setBackgroundColor('#020617');
      } catch (e) {
        console.error('Telegram WebApp SDK init failed', e);
      }
    }
  }, []);

  return null;
}
