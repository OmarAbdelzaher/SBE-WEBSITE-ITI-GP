import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../pages/style.css';
import React, { useState, useEffect } from "react";


const NavBar = () => {

  const [bar, setNavbar] = useState(false)

  //navbar scroll changeBackground function
  const changeBackground = () => {
    console.log(window.scrollY)
    if (window.scrollY >= 60) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

  return (
    
    <Navbar fixed="top" expand="lg" className={bar ? "bar active navbar-nav mx-auto" : "bar navbar-nav mx-auto"}>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" className="text-light">
        <Nav
          className="me-auto my-2 my-lg-0 fs-4 navv"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link className="text-dark" href="/">News</Nav.Link>
          <Nav.Link className="text-dark" href="">Events</Nav.Link>
          <Nav.Link className="text-dark" href="">Courses</Nav.Link>
          <Nav.Link className="text-dark" href="">About</Nav.Link>
          <Nav.Link className="text-dark" href="">Contact</Nav.Link>
          <NavDropdown className="text-dark" title="Students" id="navbarScrollingDropdown">
            <NavDropdown.Item href="">Graduate</NavDropdown.Item>
            <NavDropdown.Item href="">Undergraduate</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;


