import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faGear,
  faHome,
  faSquarePollHorizontal,
  faUser,
  faUserClock,
  faUserGraduate,
 
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function AdminNav() {
  return (
    <>
     <nav className="sidenav shadow-lg ">
       <div className="text-dark">
         <div className="dropdown-divider"></div>
         <Link className="fs-5 sbar-links" to="/moderator">
            <FontAwesomeIcon className="fs-6" icon={faHome} /> Moderator
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/users">
            <FontAwesomeIcon className="fs-6" icon={faUsers} /> Users
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/moderator">
            <FontAwesomeIcon
              className="fs-6"
              icon={faUser}
            />{" "}
            UnderGraduate
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/moderator">
            <FontAwesomeIcon
              className="fs-6"
              icon={faUserGraduate}
            />{" "}
            Graduate
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/registration-approv">
            <FontAwesomeIcon className="fs-6" icon={faUserClock} />{" "}
            Registration 
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/reservation-approv">
            <FontAwesomeIcon className="fs-6" icon={faCalendarCheck} />{" "}
            Reservation 
          </Link>
          <br></br>
          <div className="dropdown">

          <Link className="fs-6 sbar-links">
            <FontAwesomeIcon
              className="fs-6"
              icon={faSquarePollHorizontal}
            />{" "}
            News
          </Link>
          </div>
          <br></br>
        
 
  </div>

     </nav>
    </>
  );
}

export default AdminNav;


{/* <Navbar className="m-button" >
<Navbar.Toggle aria-controls="navbarScroll" />
<Navbar.Collapse id="navbarScroll">


  <Navbar.Toggle className="bg-light" aria-controls="offcanvasNavbar" />
  <Navbar.Brand className="" href="#">Menu</Navbar.Brand>

  <Navbar.Offcanvas

    className="shadow menu "
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel"
    placement="start"
  >
    <Offcanvas.Header closeButton>
      <Offcanvas.Title
        className="sbar-links fs-3 fw-bold"
        id="offcanvasNavbarLabel"
      >
        <FontAwesomeIcon className="fs-2" icon={faGear} /> Admin Control
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Nav className="justify-content-start flex-grow-1 pe-3">
        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/moderator">
            <FontAwesomeIcon className="fs-2" icon={faHome} /> Moderator
            Page
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/users">
            <FontAwesomeIcon className="fs-2" icon={faUsers} /> Users
          </Link>
        </Nav.Link>


        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/moderator">
            <FontAwesomeIcon
              className="fs-2"
              icon={faUser}
            />{" "}
            UnderGraduate
          </Link>
        </Nav.Link>


        <Nav.Link >
          <Link className="fs-3 sbar-links" to="/moderator">
            <FontAwesomeIcon
              className="fs-2"
              icon={faUserGraduate}
            />{" "}
            Graduate
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/registration-approv">
            <FontAwesomeIcon className="fs-2" icon={faUserClock} />{" "}
            Registration Approvement
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/reservation-approv">
            <FontAwesomeIcon className="fs-2" icon={faCalendarCheck} />{" "}
            Reservation Approvement
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link className="fs-3 sbar-links" to="/moderator">
            <FontAwesomeIcon
              className="fs-2"
              icon={faSquarePollHorizontal}
            />{" "}
            News
          </Link>
        </Nav.Link>


        

      </Nav>
    </Offcanvas.Body>
  </Navbar.Offcanvas>
  </Navbar.Collapse>

</Navbar> */}