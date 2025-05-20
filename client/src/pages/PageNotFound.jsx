import React from "react";
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div id="pagenotfound" className="">
     
     <div class="error-container">
        <div class="error-title">404</div>
        <div class="error-message">Oops! The page you're looking for doesn't exist.</div>
        <button onClick={() => navigate('/')} class="btn btn-primary btn-lg">Go Back to Home</button>
    </div>
        
      </div>
  );
}

export default PageNotFound;
