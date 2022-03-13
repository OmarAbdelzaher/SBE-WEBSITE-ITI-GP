import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
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
          <Link className="fs-6 sbar-links" to="/halls">
            <FontAwesomeIcon className="fs-6" icon={faUsers} /> Halls
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/labs">
            <FontAwesomeIcon className="fs-6" icon={faUser} /> Labs
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/devices">
            <FontAwesomeIcon className="fs-6" icon={faUserGraduate} /> Devices
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/hallsreservations">
            <FontAwesomeIcon className="fs-6" icon={faUserClock} /> Halls
            Reservations
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/labsreservations">
            <FontAwesomeIcon className="fs-6" icon={faCalendarCheck} /> Labs
            Reservations
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/devicesreservations">
            <FontAwesomeIcon className="fs-6" icon={faCalendarCheck} /> Devices
            Reservations
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/registration-approv">
            <FontAwesomeIcon className="fs-6" icon={faCalendarCheck} />{" "}
            Registration Approvement
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/reservation-approv">
            <FontAwesomeIcon className="fs-6" icon={faCalendarCheck} />{" "}
            Reservation Approvement
          </Link>
          <br></br>

          <div className="dropdown">
            <Link className="fs-6 sbar-links">
              <FontAwesomeIcon className="fs-6" icon={faSquarePollHorizontal} />{" "}
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
