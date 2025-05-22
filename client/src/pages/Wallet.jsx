import React from "react";
import { useNavigate } from 'react-router-dom';

function Wallet() {
  const navigate = useNavigate();
  return (
    <div id="wallet" className="message-page">
     
     <div class="error-container">
        <div class="error-title">Wallet</div>
        <div class="error-message">This feature is coming soon. Stay tuned!</div>
        <button onClick={() => navigate('/')} class="btn btn-primary btn-lg">Go Back to Home</button>
    </div>
        
      </div>
  );
}

export default Wallet;
