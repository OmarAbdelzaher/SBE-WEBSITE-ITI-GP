import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../pages/style.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
// import { Link, animateScroll as scroll } from "react-scroll";
import "../pages/style.css";
import UnderGraduateExams from "./UnderGraduateExams";


const NavBar = () => {
  const [bar, setNavbar] = useState(false);

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
            <Nav.Link
              className="nav-links text-dark"
            
                onClick={() => scroller.scrollTo('allnews', {
                  spy:true,
                  smooth: true,
                  offset: -120,
                  duration: 100,
                })}
              
              >
                News
            </Nav.Link>
            <Nav.Link
         
              className="nav-links text-dark"
              activeClassName={"active"}
            
              onClick={() => scroller.scrollTo('allevents', {
                spy:true,
                smooth: true,
                offset: -170,
                duration: 100,
            })}

              >
                Events
            </Nav.Link>
          
            {/* <ScrollLink 
        to="example-destination" 
        spy={true} 
        smooth={true} 
        duration={500} 
        className='some-class' 
        activeClass='some-active-class'
      >
        Link Text Goes Here
      </ScrollLink>  */}
            
            <Nav.Link
            
                className="nav-links text-dark"
            
                onClick={() => scroller.scrollTo('about', {
                  spy:true,
                  smooth: true,
                  offset: -170,
                  duration: 100,
              })}
              >
                About
            </Nav.Link>
            <Nav.Link
                            className="nav-links text-dark"
            
                            onClick={() => scroller.scrollTo('contact', {
                              spy:true,
                              smooth: true,
                              offset: 0,
                              duration: 100,
                          })}
              
              >
                Contact us
            </Nav.Link>
            <div className="dropdown">
              <NavDropdown
                className="dropdown"
                title="Graduates"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/adm-graduates">Admission</NavDropdown.Item>
                <NavDropdown.Item href="/coursegraduate">Courses</NavDropdown.Item>
                <NavDropdown.Item href="/graduatepage">News</NavDropdown.Item>
                <NavDropdown.Item href="/graduate-exams">Exams</NavDropdown.Item>


              </NavDropdown>
            </div>
            <div className="dropdown">
              <NavDropdown
                className="dropdown"
                title="Under-Graduates"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/adm-undergraduates">Admission</NavDropdown.Item>
                <NavDropdown.Item href="/coursesMenu">Courses</NavDropdown.Item>
                <NavDropdown.Item href="/undergraduatepage">News</NavDropdown.Item>
                <NavDropdown.Item href="">Office Hours</NavDropdown.Item>
                <NavDropdown.Item href="/reservationsShedule">Reservations Schedule</NavDropdown.Item>
                <NavDropdown.Item href="/undergraduate-exams">
                Exams
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;




