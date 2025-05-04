import React, { useEffect } from 'react';
import {BOT} from '../utils/constants';

const TelegramShare = ({user}) => {
  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleShare = () => {
    const tg = window.Telegram.WebApp;
    const botUsername = BOT.USER_NAME; // Replace with your bot's username
    const startParam = user?.telegram_id; // Custom parameter (optional)
    const shareUrl = `https://t.me/${botUsername}?startapp=${startParam}`;

    // Open Telegram share link
    tg.openTelegramLink(shareUrl);
  };

  console.log(user);
  return (
    <div>
      <h3>Share This App   <button onClick={handleShare} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#0088cc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Share on Telegram
      </button></h3>
     
    </div>
  );
};

export default TelegramShare;
