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

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log("Dashboard", user);
  return (
    <section id="dashboard" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <div className="banner-img">
          <h2 className="text-center mb-4 text-white">Dashbord</h2>
        </div>
        <div className="content">
          <div className="row ">
            <div className="col-md-12">
              <div className="user-details">
                <div>Welcome, <h3>{user?.username}!</h3></div>
              </div>
              <div className="rewards-section">
                <div className='rewards-inner-wrap'>
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
    </section>
  );
}

export default Dashboard;
