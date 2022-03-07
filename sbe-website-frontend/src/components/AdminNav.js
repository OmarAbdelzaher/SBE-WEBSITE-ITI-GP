import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarDay,
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
      <Navbar className="m-button" expand={false}>
        <Navbar.Toggle className="bg-light" aria-controls="offcanvasNavbar" />
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
                  <FontAwesomeIcon className="fs-2" icon={faCalendarDay} />{" "}
                  Reservation List
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
      </Navbar>
    </>
  );
}

export default AdminNav;
