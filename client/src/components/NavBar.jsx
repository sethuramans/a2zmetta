import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';


const linkClass = ({ isActive }) =>
`nav-link nav-item tab ${isActive ? 'active rest' : ''}`;



const NavbarMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <header
        className={`header d-flex align-items-center  fixed-top ${
          scrolled ? "header-scrolled bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <section
          id="navbar"
          className={`navbar navbar-expand-md navbar-dark w-100   fixed-sm-bottom  `}
        >
          <div className="tab-nav-container w-100">
            <div className="d-flex flex-column flex-md-row align-items-center w-100">
              <a
                href="/"
                className="mx-3 d-sm-flex align-items-center link-body-emphasis1 text-decoration-none d-sm-block d-none"
              >
                <span className="fs-4">Atoz Metta</span>
              </a>
              <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <NavLink className={linkClass} to="/">
                  <i className="bi bi-house-door"></i>
                  <p>Home</p>
                </NavLink>
                {user?.id && (
                  <>
                   
                    <NavLink className={linkClass} to="/profile">
                      <i className="bi bi-person"></i>
                      <p> Profile</p>
                    </NavLink>
                    <NavLink className={linkClass} to="/wallet">
                      <i className="bi bi-wallet2"></i>
                      <p>Wallet</p>
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
              </nav>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default NavbarMenu;
