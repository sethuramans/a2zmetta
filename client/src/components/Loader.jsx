import React from 'react';

const Loader = ({ message = 'Loading, please wait...' }) => {
  return (
    <div className="fullscreen-loader">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Loader;
