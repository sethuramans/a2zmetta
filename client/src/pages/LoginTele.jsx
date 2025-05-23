import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import {loginUser} from '../services/api';

 function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {


    const _loginUser = async () => {
      
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
  
        const teleUser = tg.initDataUnsafe?.user;
        let user = {};
        if (teleUser) {
          console.log("Telegram user  found");
           user = {
             telegramId: teleUser.id,
             displayname: teleUser.first_name || "",
             lastname: teleUser.last_name || "",
             username: teleUser.username || teleUser.id,
             photoUrl: teleUser.photo_url || "",
           };
        } else {
          
          console.log("Telegram user not found, Might be a website access");
           user = {
             telegramId: 12345678,
             displayname: "Anonymous",
             lastname: "user",
             username: "anonymous",
             photoUrl: "",
           };
        }



        



       /* if (!window.Telegram) {
          window.Telegram = { WebApp: {} };
        }
    
        if (!window.Telegram.WebApp.initData) {
          window.Telegram.WebApp.initData = {
            user: {
              telegramId: 123456789,
              displayname: "Sethuraman",
              username: "sethuramancbe",
            },
          };
        }*/
        const response = await loginUser({ user });
        console.log('_loginUser response', response);
        dispatch(login(response));
        navigate("/profile");
        //window.location.href = "/profile";
      } catch (error) {
        console.error("Error Logging user:", error);
      } finally {
        
      }
    };

    _loginUser();
  }, [dispatch, navigate]);

  return (
    <section id="aboutus" className="py-2  min-vh-100 main-section">
    <div className="container-fluid">
      <div className="banner-img">
        <h2 className="text-center mb-4 text-white">Log In</h2>
      </div>
        <div className="content">
        <div className="row align-items-center">
          <div className="row ">
            <div className="col-md-12">
              {" "}
              <p className="lead">Logging in through Telegram!</p>
              <p>Facing issues?</p><Link
                  to="/"
                  className="btn btn-primary d-block mx-auto my-2"
                >
                  Home
                </Link>
            </div>
          </div>
        </div>
        </div>
        
      </div>
    </section>
  );
}

export default Login;
