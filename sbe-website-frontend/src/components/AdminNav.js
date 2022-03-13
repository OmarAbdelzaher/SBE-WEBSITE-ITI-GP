import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarDays,
  faCalendarTimes,
  faClinicMedical,
  faClock,
  faFlask,
  faGear,
  faGears,
  faHome,
  faHourglass,
  faListCheck,
  faMicroscope,
  faSchool,
  faScrewdriverWrench,
  faSquarePollHorizontal,
  faToolbox,
  faUser,
  faUserClock,
  faUserGraduate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function AdminNav() {
  return (
    <>
     <nav className="sidenav">
       <div className="text-dark">
         <div className="dropdown-divider"></div>
         <Link className="fs-3 fw-normal sbar-links" to="/moderator">
            <FontAwesomeIcon className="fs-4" icon={faScrewdriverWrench} style={{color:"#003049"}} /> Moderator
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/halls">
            <FontAwesomeIcon className="fs-6" icon={faSchool} style={{color:"#003049"}} /> Halls
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/labs">
            <FontAwesomeIcon
              className="fs-6"
              icon={faFlask}
              style={{color:"#003049"}}
            />{" "}
            Labs
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/devices">
            <FontAwesomeIcon
              className="fs-6"
              icon={faMicroscope}
              style={{color:"#003049"}}
            />{" "}
            Devices
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/hallsreservations">
            <FontAwesomeIcon className="fs-6" icon={faListCheck} style={{color:"#003049"}}/>{" "}
            Halls Reservations 
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/labsreservations">
            <FontAwesomeIcon className="fs-6" icon={faClock} style={{color:"#003049"}}/>{" "}
            Labs Reservations 
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/devicesreservations">
            <FontAwesomeIcon className="fs-6" icon={faHourglass} style={{color:"#003049"}}/>{" "}
            Devices Reservations 
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/registration-approv">
            <FontAwesomeIcon className="fs-6" icon={faUserClock} style={{color:"#003049"}}/>{" "}
            Registration Approvement 
          </Link>
          <br></br>
          <Link className="fs-6 sbar-links" to="/reservation-approv">
            <FontAwesomeIcon className="fs-6" icon={faCalendarDays} style={{color:"#003049"}}/>{" "}
            Reservation Approvement 
          </Link>
          <br></br>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;
