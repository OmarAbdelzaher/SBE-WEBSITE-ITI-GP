import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../pages/style.css";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";

import "../pages/style.css";

const NavBar = () => {
  const [bar, setNavbar] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        className={
          bar ? "bar active navbar-nav mx-auto" : "bar navbar-nav mx-auto"
        }
      >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 fs-3">
            <Nav.Link>
              <Link className="nav-links" to="">
                News
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-links" to="">
                Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-links" to="">
                Courses
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className="nav-links"
                activeClass="active"
                to="/about"
                spy={true}
                smooth={true}
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-links" to="">
                Contact us
              </Link>
            </Nav.Link>
            <div className="dropdown">
              <NavDropdown
                className="dropdown"
                title="Students"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="">Graduate</NavDropdown.Item>
                <NavDropdown.Item href="">Undergraduate</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
