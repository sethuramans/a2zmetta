// src/pages/Dashboard.js
/*import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('/auth/dashboard', { headers: { Authorization: token } })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error loading dashboard data', error);
        });
    } else {
      window.location.href = '/';
    }
  }, [token]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.message}</h1>
      <p>Welcome back, {data.user.username}!</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
*/

import React from "react";
import { useSelector } from "react-redux";
import RewardsTimer from "../components/RewardTimer";
import TotalRewardsEarned from "../components/TotalRewards";
import Header from "../components/Header";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log("Dashboard", user, user.username);
  return (
    <div id="dashboard" className="">
      <Header title="Dashboard" />
      <div className="main-content container">
        <div className="row ">
          <div className="col-md-12 col-lg-6">
            <div className="user-details">
              <div>
                Welcome, <h3>{user?.username}!</h3>
              </div>
            </div>
            <div className="rewards-section">
              <div className="rewards-inner-wrap">
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
