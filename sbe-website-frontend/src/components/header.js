import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import logo from '../assets/image/departmentLogo.png'

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
    <Navbar fixed="top" className={head ? "head scroll" : "head"}>
      <Navbar.Brand href="#home">
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
        <Nav.Link className="text-light fs-5" href="/">Home</Nav.Link>
        <Nav.Link className="text-light fs-5" href="">Login</Nav.Link>
        <Nav.Link className="text-light fs-5" href="">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;

