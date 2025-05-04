import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {getProfile} from '../services/api';
import Share from "../components/Share";

import LogoutButton from "../components/LogoutButton";
import TelegramShare from '../components/ShareButton';

const Dashboard = () => {
  //const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  useEffect(() => {
    //const token = localStorage.getItem('token');
    if (!user) { 
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <section id="profile" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <div className="banner-img">
          <h2 className="text-center mb-4 text-white">Profile</h2>
        </div>

        <div className="content">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="profile-content">
                <h2>Welcome {user.username}</h2>
                
                {user && <TelegramShare user={user}/>}
                {user && <LogoutButton />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
