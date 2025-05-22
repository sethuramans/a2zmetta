import React, { useState } from 'react';
import {getBaseUrl} from '../utils/helper';

const ReferralShare = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${getBaseUrl()}/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h5>Your Referral Code</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={shareUrl}
          readOnly
        />
        <button className="btn btn-outline-secondary" onClick={handleCopy}>
          <i className=''></i> {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <h6>Share with friends</h6>
      <div className="d-flex gap-2">
        <a
          href={`https://wa.me/?text=Join%20me%20on%20this%20awesome%20app!%20Use%20my%20referral:%20${shareUrl}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success"
        >
          <i className=''></i> WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Join%20me%20using%20this%20referral!`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-info text-white"
        >
          <i className=''></i> Telegram
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=Join%20me%20and%20earn%20rewards!%20${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          <i className=''></i> Twitter
        </a>
      </div>
    </div>
  );
};

export default ReferralShare;
