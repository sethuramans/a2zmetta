// src/components/TelegramLogin.js
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "../axios";

const TelegramLogin = () => {
  const dispatch = useDispatch();

  const handleTelegramLogin = () => {
    const telegramUser = window.Telegram.WebApp.initDataUnsafe;

    if (telegramUser) {
      const { user } = telegramUser;

      axios
        .post("/auth/login", {
          telegramId: user.id,
          username: user.username,
        })
        .then((response) => {
          const { token, user } = response.data;
          // Dispatch login action to store token and user
          dispatch(login({ token, user }));
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  };

  return (
    <div>
      <button onClick={handleTelegramLogin}>Login with Telegram</button>
    </div>
  );
};

export default TelegramLogin;
