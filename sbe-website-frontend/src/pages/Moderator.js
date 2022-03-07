import React from 'react'
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Offcanvas } from 'bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHome, faSquarePollHorizontal, faSquareRootVariable, faUserClock } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import "../pages/style.css";
import "../App.css";


function Moderator() {


  return (
    <>
      <section className="">
        <div className="container">
          <div className="sidebar m-button row shadow justify-content-center">
            <Navbar className='m-button' expand={false}>
              <Navbar.Brand className='fs-4 text-light'>Menu</Navbar.Brand>
              <Navbar.Toggle className='bg-light' aria-controls="offcanvasNavbar" />
              <Navbar.Offcanvas
                className="shadow menu "
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title className='sbar-links fs-3 fw-bold' id="offcanvasNavbarLabel">
                  <FontAwesomeIcon className='fs-2' icon={faGear} /> {" "} 
                   {" "} Admin Control
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-start flex-grow-1 pe-3">
                    <Nav.Link>
                      <Link className="fs-3 sbar-links" to="/moderator">
                        <FontAwesomeIcon className='fs-2' icon={faHome} />{" "}
                        Moderator Page
                      </Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link className="fs-3 sbar-links" to="/moderator">
                        <FontAwesomeIcon className='fs-2' icon={faSquarePollHorizontal} /> {" "}             
                        Reservation Approvement</Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link className="fs-3 sbar-links" to="/moderator">
                        <FontAwesomeIcon className='fs-2' icon={faUserClock} /> {" "}             
                        Registration Approvement</Link>
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar>



            {/* <div class="sidebar shadow-lg p-3 mb-5 bg-body rounded">
              <a href="#home"><i class="fa fa-fw fa-home"></i> Home</a>
              <a href="#services"><i class="fa fa-fw fa-wrench"></i> Services</a>
              <a href="#clients"><i class="fa fa-fw fa-user"></i> Clients</a>
              <a href="#contact"><i class="fa fa-fw fa-envelope"></i> Contact</a>
            </div>
            <div className='main'>
              <p>Hello</p>

            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Moderator


