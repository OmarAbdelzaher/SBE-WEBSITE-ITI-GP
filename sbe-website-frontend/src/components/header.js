import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/image/departmentLogo.png";
import { Link } from "react-router-dom";
import "../pages/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [head, setHeader] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 60) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <Navbar fixed="top" expand="lg" className={head ? "head scroll" : "head"}>
      <Navbar.Brand className="col-3" href="/">
        <img
          src={logo}
          width="200"
          height="90"
          className="d-inline-block align-top"
          alt="Department logo"
        />
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav variant="dark" className="col-6 offset-7">
        <Nav.Link className="button">
          <Link className="fs-5 header-link ani" to="/">
            <FontAwesomeIcon icon={faHome} />{" "}
          </Link>
        </Nav.Link>
        <Nav.Link className="button">
          <Link className="fs-5 header-link ani" to="/login">
            Log In
          </Link>
        </Nav.Link>
        <Nav.Link className="button">
          <Link className="fs-5 header-link ani" to="/signup">
            Sign Up
          </Link>
        </Nav.Link>
        <Nav.Link className="button">
          <Link className="fs-5 header-link ani" to="/reservation">
            Reservation
          </Link>
        </Nav.Link>
        {/* <Nav.Link className="text-light fs-5" href="/SignupForm">Sign Up</Nav.Link> */}
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
