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
      {/*<div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
     <Navbar bg="dark" expand="lg" >
        <Container className="d-flex flex-column flex-md-row align-items-center w-100">
          <Navbar.Brand as={NavLink} to="/">
            <h1 className="sitename">AtoZ Metta</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              {user?.id && (
                <>
                  <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/tasks">
                    Tasks
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={NavLink} to="/about-us">
                Info
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>*/
      /*
      <NavLink className="logo d-flex align-items-center" to="/">
        <h1 className="sitename">AtoZ Metta</h1>
      </NavLink>

      <nav
        id="navmenu"
        className={`navmenu collapse navbar-collapse ${isOpen ? "show" : ""}`}
      >
        <ul>
          <li>
            <NavLink className={linkClass} to="/">
              <p>Home</p>
            </NavLink>
          </li>
          {user?.id && (
            <>
              <li>
                <NavLink className={linkClass} to="/dashboard">
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClass} to="/profile">
                  <p> Profile</p>
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClass} to="/tasks">
                  <p>Tasks</p>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink className={linkClass} to="/about-us">
              <p>Info</p>
            </NavLink>
          </li>
        </ul>
        <i
          className="navbar-toggler mobile-nav-toggle d-xl-none bi bi-list"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navmenu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        ></i>
      </nav>
      
          </div>*/}
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
