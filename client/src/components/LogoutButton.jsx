import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // ✅ Clear Redux store & localStorage
    navigate("/"); // ✅ Redirect to login page
  };

  return (
    <button className="btn btn-primary  d-block mx-auto my-2" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
