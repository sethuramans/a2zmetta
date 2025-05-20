import React, { useEffect } from 'react';

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


import LogoutButton from "../components/LogoutButton";
import TelegramShare from '../components/ShareButton';

const Dashboard = () => {

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) { 
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <section id="profile" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <Header title="Profile" />

        <div className="content">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="profile-content">
                <h2>Welcome {user.username}</h2>

                {user && <TelegramShare user={user} />}
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
