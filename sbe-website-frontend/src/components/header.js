import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import logo from '../assets/image/departmentLogo.png'
import { Link } from "react-router-dom";


const Header = () => {
  const [head, setHeader] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
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
    <Navbar fixed="top" className={head ? "head scroll" : "head"}>
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="200"
          height="95"
          className="d-inline-block align-top"
          alt="Department logo"
        />
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      <Nav variant="dark" className="">
        <Nav.Link>
          <Link className="fs-5 header-link" to="/">Home</Link>
        </Nav.Link>
        <Nav.Link>
        <Link className="fs-5 header-link" to="/login" >Login</Link>
        </Nav.Link>
        <Nav.Link>
        <Link className="fs-5 header-link" to="/signup">Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
        <Link className="fs-5 header-link" to="/reservation" >Reservation</Link>
        </Nav.Link>
        {/* <Nav.Link className="text-light fs-5" href="/SignupForm">Sign Up</Nav.Link> */}
      </Nav>
    </Navbar>
  );
};

export default Header;

