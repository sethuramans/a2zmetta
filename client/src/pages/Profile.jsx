import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Loader from '../components/Loader';
import LogoutButton from '../components/LogoutButton';
import ReferralShare from '../components/ReferralShare';
import FriendsList from '../components/FriendsList';
import RewardsTimer from "../components/RewardTimer";
import TotalRewardsEarned from "../components/TotalRewards";

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
        <div className="row align-items-center d-flex align-items-stretch">
          <div className="col-md-12">
            <div className="profile-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Welcome {user?.displayname || user.username}</h2>
                <div className='d-flex'>
                  <button className='btn btn-primary  d-block m-2' onClick={() => navigate('/profile/update')}>Edit</button>
                  <LogoutButton />
                </div>
              </div>
            </div>
            
          </div>
          
          
          <div className=" col-md-12 col-lg-6 h-100 mb-3">
            <div className='highlight-section'>
              <div className="highlight-inner-wrap">
                <div className="rewards-earned">
                  <div className="icon">
                    <span className="bi bi-award"></span>
                  </div>
                  <div className="info">
                    <TotalRewardsEarned />
                  </div>
                </div>

                <hr />
                {user && (
                  <div className="rewards-mining">
                    <RewardsTimer userId={user?.id} />
                    {/*<Timer userId={user?.id} />*/} {/* ✅ Pass User ID */}
                  </div>
                )}
              </div>
              </div>
            </div>
            <div className=' col-md-12 col-lg-6 h-100 mb-3'><FriendsList /></div>
            <div className='col-lg-12 mb-3'><ReferralShare referralCode={user.referralCode} /></div>
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
