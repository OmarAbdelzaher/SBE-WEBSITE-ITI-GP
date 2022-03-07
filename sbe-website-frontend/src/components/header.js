import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/image/departmentLogo.png";
import { Link, Redirect } from "react-router-dom";
import "../pages/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Header = ({ logout, isAuthenticated }) => {
  const [head, setHeader] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <>
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
    </>
  );
  const authLinks = () => (
    // <li className='nav-item'>
    //     <a className='nav-link' href='#!' onClick={logout_user}>Logout</a>
    // </li>
    <Nav.Link className="button">
      <Link className="fs-5 header-link ani"  onClick={logout_user}>
       Logout
      </Link>
    </Nav.Link>
  );

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
    <>
      <Navbar fixed="top" fixed="top" className={head ? "head scroll" : "head"}>
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
          <Nav variant="dark" className="col-7 offset-6">
            <Nav.Link className="button">
              <Link className="fs-5 header-link ani" to="/">
                <FontAwesomeIcon icon={faHome} />{" "}
              </Link>
            </Nav.Link>
            {/* <Nav.Link className="button">
            <Link className="fs-5 header-link ani" to="/login">
              Log In
            </Link>
          </Nav.Link>
          <Nav.Link className="button">
            <Link className="fs-5 header-link ani" to="/signup">
              Sign Up
            </Link>
          </Nav.Link> */}
            {isAuthenticated ? authLinks() : guestLinks()}
            <Nav.Link className="button">
              <Link className="fs-5 header-link ani" to="/reservation">
                Reservation
              </Link>
            </Nav.Link>
            {/* <Nav.Link className="text-light fs-5" href="/SignupForm">Sign Up</Nav.Link> */}
            <Nav.Link className="button">
              <Link className="fs-5 header-link ani" to="/moderator">
              Moderator
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {redirect ? <Redirect to="/" /> : <></>}
    </>
  );
};

// export default Header;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
