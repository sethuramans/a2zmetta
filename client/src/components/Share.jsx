import React, { useEffect, useState } from 'react';

function Share({ user }) {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (user?.telegram_id) {
      const link = `https://t.me/YourBot?start=ref_${user.telegram_id}`;
      setReferralLink(link);
    }
  }, [user]);

  const shareReferral = () => {
    if (window.Telegram?.WebApp?.shareText) {
      window.Telegram.WebApp.shareText(`Join the app and earn rewards! ${referralLink}`);
    } else {
      navigator.clipboard.writeText(referralLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="hightlight-section">
      <div className="hightlight-inner-wrap">
        <div className="title-area">
          <div className="icon">
            <span className="bi bi-people"></span>
          </div>
          <div className="info">
            <h2> Invite Friends & Earn Rewards</h2>
          </div>
        </div>

        <hr />
        <div className="content-area text-center">
          <p>Your referral link :
          <code className="d-block mb-3">{referralLink}</code></p>
          <button className="btn btn-success" onClick={shareReferral}>
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share;
