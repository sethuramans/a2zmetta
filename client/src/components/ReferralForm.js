import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { loginUser } from "../services/api";

const ReferralForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUserData] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Grab telegram ID & start_param from Telegram Mini App
    const tg = window.Telegram.WebApp;
    tg.ready();

    const initData = tg.initDataUnsafe;
    const teleUser = initData?.user;
    let _user = {};
    if (teleUser) {
      const _referredBy = initData?.start_param;
      console.log("Telegram user  found");
      _user = {
        telegramId: teleUser.id,
        firstname: teleUser.first_name || "",
        lastname: teleUser.last_name || "",
        username: teleUser.username || teleUser.id,
        photoUrl: teleUser.photo_url || "",
        referredBy: _referredBy,
      };

      setUserData(_user);
      if (_referredBy) setReferralCode(_referredBy);
    }
  }, []);

  const registerUser = async () => {
    try {
      const response = await loginUser({ user });
      console.log("_loginUser response", response);
      dispatch(login(response));
      navigate("/dashboard");
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error creating user");
    }
  };

  if (!referralCode)
    return (
      <Link to="/login" className="btn btn-primary d-block mx-auto my-2">
        Login
      </Link>
    );
  return (
    <div>
      <h3>Welcome to the App</h3>
      <p>Your Telegram ID: {user?.telegramId}</p>
      {referralCode && <p>Referral Code Used: {referralCode}</p>}
      <button onClick={registerUser}>Register with Referral</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReferralForm;
