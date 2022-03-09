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
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";

let flag = false

const Header = ({ logout, isAuthenticated }) => {
  const [head, setHeader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [is_staff, setIs_staff] = useState(false);
  const staff = useSelector(state=>state.auth)

  if( isAuthenticated && staff.user != null && flag == false)
  {
    if (staff.user.role == 'dr' || staff.user.role == 'ta'){
      setIs_staff(true)
      flag = true
    }
  }
  
  const logout_user = () => {
    setIs_staff(false)
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

  const staffLinks = () =>(
    <>
    <Nav.Link className="button">
      <Link className="fs-5 header-link ani"  to="/reservation">
       Reservation
      </Link>
    </Nav.Link>
    </>
  )

  const authLinks = () => (
    <Nav.Link className="button">
      <Link className="fs-5 header-link ani" to="/"  onClick={logout_user}>
       Logout
      </Link>
    </Nav.Link>
    
  );

  const signedInLink = () => (
    <Nav.Link className="button">
      <Link className="fs-5 header-link ani" to="/profilepage" >
       Edit Profile 
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
            {isAuthenticated ? authLinks() : guestLinks()}
            {isAuthenticated ? signedInLink() : null}

            
            {/* <Nav.Link className="text-light fs-5" href="/SignupForm">Sign Up</Nav.Link> */}
            <Nav.Link className="button">
              <Link className="fs-5 header-link ani" to="/moderator">
              Moderator
              </Link>
            </Nav.Link>
            {is_staff ? staffLinks() : null}

            { isAuthenticated ? <div className="dropdown">
              <NavDropdown
                className="dropdown"
                title= {
                  staff.user != null ? staff.user.fname : null
                }  
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/profilepage">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/reservation">Reservation</NavDropdown.Item>
                <NavDropdown.Item href="/officehoursDetails/">Office Hours</NavDropdown.Item>
                <NavDropdown.Item href="/reservationsShedule">Reservations Schedule</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </div> : null }

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
