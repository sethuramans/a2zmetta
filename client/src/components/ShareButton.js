import React, { useEffect, useState } from 'react';
import {BOT} from '../utils/constants';

const TelegramShare = ({user}) => {
  const [copied, setCopied] = useState(false);

  const botUsername = BOT.USER_NAME; // 🔁 Replace with your bot's username
  const startParam = user?.telegram_id; // Optional: customize for tracking/referrals
  const shareUrl = `https://t.me/${botUsername}?start=${startParam}`;

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleCopyAndShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      // Optional: Show Telegram popup to confirm
      window.Telegram?.WebApp?.showPopup({
        title: "Link Copied!",
        message: "Telegram Mini App link copied to clipboard.\nWant to share it?",
        buttons: [
          { id: "share", type: "default", text: "Share in Telegram" },
          { id: "cancel", type: "cancel", text: "Cancel" }
        ]
      });

      // Listen for user's choice (this example uses a one-time event listener)
      const listener = (event) => {
        if (event?.data?.button_id === "share") {
          window.Telegram.WebApp.openTelegramLink(shareUrl);
        }
        window.removeEventListener("message", listener);
      };

      window.addEventListener("message", listener);

      // Reset "Copied" after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Invite via Telegram</h3>
      <button onClick={handleCopyAndShare} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#0088cc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Copy & Share Link
      </button>
      {copied && <p style={{ color: 'green', marginTop: '10px' }}>Link copied!</p>}
    </div>
  );
};

export default TelegramShare;
