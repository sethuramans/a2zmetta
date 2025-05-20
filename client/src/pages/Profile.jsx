import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Loader from '../components/Loader';
import LogoutButton from '../components/LogoutButton';
import ReferralShare from '../components/ReferralShare';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return <Loader />;

  return (
    <div id="profile">
      <Header title="Profile" />
      <div className="main-content container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="profile-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Welcome {user.username}</h2>
                <div><LogoutButton /></div>
              </div>

              <ReferralShare referralCode={user.referralCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
