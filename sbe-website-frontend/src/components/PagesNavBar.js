import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../pages/style.css";
import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import "../pages/style.css";
import { useSelector } from "react-redux";

const NavBar = (isAuthenticated) => {
  let flag = false;

  const [bar, setNavbar] = useState(false);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const person = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && person.user != null && flag == false) {
      if (person.user.role == "dr" || person.user.role == "ta") {
        setIs_staff(true);
        if (person.user.is_coordinator) {
          setIsCoordinator(true);
        }
        flag = true;
      }

      if (person.user.role == "employee") {
        setIsEmp(true);
        if (person.user.is_moderator) {
          setIsModerator(true);
        }
      }

      if (person.user.is_admin) {
        setIsAdmin(true);
      }
    }
  });

  //navbar scroll changeBackground function
  const changeBackground = () => {
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
      <section  className="nnn">
        <Navbar
          fixed="top"
          expand="lg"
          className={
            bar
              ? "p-navbar active navbar-nav mx-auto "
              : "p-navbar navbar-nav mx-auto"
          }
        >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 fs-3">
              <Nav.Link className="nav-links" href="/allnews">
                News
              </Nav.Link>
              <Nav.Link className="nav-links" href="/allevents">
                Events
              </Nav.Link>

              <div className="dropdown">
                <NavDropdown
                  className="dropdown"
                  title="Graduates"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/graduatepage">News</NavDropdown.Item>
                  <NavDropdown.Item href="/staffpage">Staff</NavDropdown.Item>
                  <NavDropdown.Item href="/coursegraduate">
                    Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/officehourschedule">
                    Office Hours
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/graduate-exams">
                    Exams Schedule
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/graduate-lecs">
                    Lectures Schedule
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <div className="dropdown">
                <NavDropdown
                  className="dropdown"
                  title="Under-Graduates"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/adm-undergraduates">
                    Admission
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/undergraduatepage">
                    News
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/staffpage">Staff</NavDropdown.Item>
                  <NavDropdown.Item href="/coursesMenu">
                    Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/officehourschedule">
                    Office Hours
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/undergraduate-exams">
                    Exams Schedule
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/undergraduate-lecs">
                    Lectures Schedule
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    </>
  );
};

export default NavBar;