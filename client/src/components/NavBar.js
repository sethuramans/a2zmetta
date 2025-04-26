import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const linkClass = ({ isActive }) =>
`nav-link nav-item tab ${isActive ? 'active rest' : ''}`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section
      id="footer"
      className="navbar navbar-expand-md navbar-dark fixed-bottom bg-dark"
    >
      <div className="tab-nav-container">
        <NavLink className={linkClass} to="/">
          <i className="bi bi-house-door"></i>
          <p>Home</p>
        </NavLink>
        {user?.id && (
          <>
            <NavLink className={linkClass} to="/dashboard">
              <i className="bi bi-grid"></i>
              <p>Dashboard</p>
            </NavLink>
            <NavLink className={linkClass} to="/profile">
              <i className="bi bi-person"></i>
              <p> Profile</p>
            </NavLink>
            <NavLink className={linkClass} to="/tasks">
              <i className="bi bi-list-task"></i>
              <p>Tasks</p>
            </NavLink>
          </>
        )}

        <NavLink className={linkClass} to="/about-us">
          <i className="bi bi-info-circle"></i>
          <p>Info</p>
        </NavLink>
      </div>
    </section>
  );
};

export default Navbar;
