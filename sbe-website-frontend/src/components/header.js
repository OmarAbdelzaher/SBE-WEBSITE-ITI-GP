import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/uploaded-files/bg-image/departmentLogo.png";
import { Link, Redirect } from "react-router-dom";
import "../pages/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import useMediaQuery from "@mui/material/useMediaQuery";



const Header = ({ logout, isAuthenticated }) => {
  let flag = false

  const [head, setHeader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator,setIsCoordinator] = useState(false)
  const [isModerator,setIsModerator] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)


  const person = useSelector(state=>state.auth)
  
  useEffect(() => {

    if( isAuthenticated && person.user != null && flag == false)
    {
      if (person.user.role == 'dr' || person.user.role == 'ta'){
        setIs_staff(true)
        if(person.user.is_coordinator)
        {
          setIsCoordinator(true)
        }
        flag = true
      }

      if(person.user.role == 'employee'){
        setIsEmp(true)
        if(person.user.is_moderator)
        {
          setIsModerator(true)
        }
      }

      if(person.user.is_admin){
        setIsAdmin(true)
      }
    }
  });

  const logout_user = () => {
    setIs_staff(false)
    setIsEmp(false)
    setIsModerator(false)
    setIsCoordinator(false)
    setIsAdmin(false)

    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <>
      <Nav.Link className="button btn-b" >
        <Link className="fs-4 header-link ani btn-b" to="/login">
          Log In
        </Link>
      </Nav.Link>
      <Nav.Link className="button btn-b">
        <Link className="fs-4 header-link ani btn-b" to="/signup">
          Sign Up
        </Link>
      </Nav.Link>
    </>
  );

  const authLinks = () => (
    <Nav.Link className="button btn-b">
      <Link className="fs-4 header-link ani btn-b" to="/"  onClick={logout_user}>
       Log out
      </Link>
    </Nav.Link>
    
  );
  
const moderatorLink = () => (
  <Nav.Link className="button btn-b">
    <Link className="fs-4 header-link ani btn-b" to="/moderator">
    Moderator
    </Link>
  </Nav.Link>
)

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


     const style = {
       // Adding media query..
       "@media (max-width: 500px)": {
         display: "none",
       },
     };
  return (
    <>
      <Navbar fixed="top" className={head ? "head scroll" : "head"}>
        <Navbar.Brand className="col-2" style={style} href="/">
          <img
            src={logo}
            style={style}
            width="180"
            height="70"
            className="d-inline-block align-top"
            alt="Department logo"
          />
        </Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="col-11 d-flex justify-content-end align-items-end">
            <Nav.Link className="button btn-b">
              <Link
                className="fs-4 ani btn-b"
                to="/"
                style={{ color: "#9b2226" }}
              >
                <FontAwesomeIcon icon={faHome} />{" "}
              </Link>
            </Nav.Link>

            {isAuthenticated ? (
              <div className="dropdown btn-b fs-4" style={{ color: "#001233" }}>
                <NavDropdown
                  className=" button btn-b "
                  title={person.user != null ? person.user.fname : null}
                  id="headScrollingDropdown"
                  aria-controls="navbar-dark-example"
                >
                  <div className="  " aria-expanded="false">
                    <NavDropdown.Item>
                      <Link className="nav-links" to="/profilepage">
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    {is_staff || isAdmin ? (
                      <>
                        <NavDropdown.Item>
                          <Link className="nav-links" to="/reservation">
                            Reservation
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-links" to="/officehoursDetails/">
                            Office Hours
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link className="nav-links" to="/reservationsShedule">
                            Reservations Schedule
                          </Link>
                        </NavDropdown.Item>
                      </>
                    ) : null}
                    {isModerator || isAdmin ? (
                      <NavDropdown.Item>
                        <Link className="nav-links" to="/moderator">
                          Moderator
                        </Link>
                      </NavDropdown.Item>
                    ) : null}
                  </div>
                </NavDropdown>
              </div>
            ) : null}
            {isAuthenticated ? authLinks() : guestLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {redirect ? <Redirect to="/" /> : <></>}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
