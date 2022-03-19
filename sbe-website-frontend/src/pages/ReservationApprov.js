import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from 'react-router-dom';

import {
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

function ReservationApprov() {

  const moderator = useSelector(state=>state.auth)
  
  const [halls, setHalls] = useState([]);
  const [labs, setLabs] = useState([]);
  const [devices, setDevices] = useState([]);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservedhalls/")
      .then((res) => setHalls(res.data.filter((s) => s.is_confirmed == false)));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservedlabs/")
      .then((res) =>
        setLabs(res.data.filter((st) => st.is_confirmed == false))
      );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reserveddevices/")
      .then((res) =>
        setDevices(res.data.filter((e) => e.is_confirmed == false))
      );
  }, []);


  if(moderator.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (moderator.user != null )
  {
    if ( moderator.user.is_moderator == false  && moderator.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }


  function onChange(e) {
    if (e.target.value == "halls") {
      setReservation(halls);
    } else if (e.target.value == "labs") {
      setReservation(labs);
    } else if (e.target.value == "devices") {
      setReservation(devices);
    } else if (e.target.value == "Reservation Types") {
      alert("Choose a proper Request Type");
    }
  }


  let url = "";

  const ConfirmReservation = (reserve) => {
    let reserveData = new FormData();

    console.log(reserve.staff_id)

    if (reserve.hall_id) {
      url = `http://localhost:8000/api/reservedhall/${reserve.id}`;
      reserveData.append("hall_id", reserve.hall_id[0]);
    } else if (reserve.lab_id) {
      url = `http://localhost:8000/api/reservedlab/${reserve.id}`;
      reserveData.append("lab_id", reserve.lab_id[0]);
    } else if (reserve.device_id) {
      url = `http://localhost:8000/api/reserveddevice/${reserve.id}`;
      reserveData.append("device_id", reserve.device_id[0]);
    }

    reserveData.append("staff_id", reserve.staff_id[0]);
    reserveData.append("date", reserve.date);
    reserveData.append("timeslot", reserve.timeslot[0]);

    reserveData.append("is_confirmed", true);

    axios
      .put(url, reserveData)
      .then((res) => {
        const reserve_update = reservation.filter((item) => item.id !== reserve.id);
        setReservation(reserve_update);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <section className=" main">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body ">
                <p className="fs-1 text-light"> Reservation Menu</p>

                <select
                className="select form-control-lg btn btn-md col-3" style={{backgroundColor:"#003049", color:"#ffff"}}
                onChange={(e) => onChange(e)}
                name="ReserveType"
                value={reservation}
              >
                <option selected value="Reservation Types">
                  Reservation Types
                </option>
                <option value="halls">Halls Reservations</option>
                <option value="labs">Labs Reservations</option>
                <option value="devices">Devices Reservations</option>
              </select>

              </div>

              

              <div>
                <table className="table  table-hover bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark ">
                      <th>#</th>
                      <th className="text-dark fw-light">Name</th>
                      <th className="text-dark fw-light">Reserved By</th>
                      <th className="text-dark fw-light">Confirm By</th>
                      <th className="text-dark fw-light">Date</th>
                      <th className="text-dark fw-light">Time Slot</th>
                      <th className="text-dark fw-light">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="fs-5">
                    {reservation.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>

                          {item.hall_id ? <td>{item.hall_id[1]}</td> : null}
                          {item.lab_id ? <td>{item.lab_id[1]}</td> : null}
                          {item.device_id ? <td>{item.device_id[1]}</td> : null}

                          <td>{item.staff_id[1]}</td>
                          <td>{moderator.user.fname}{" "}{moderator.user.lname}</td>
                          <td>{item.date}</td>
                          <td>{item.timeslot[1]}</td>
                          <td>
                            <Link to="#">
                              <button className="btn btn-md nav-links" onClick={()=>{ConfirmReservation(item)}}>
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faCalendarCheck}
                                />{" "}
                                Confirm
                              </button>
                            </Link>
                          </td>
                        </tr>
                        
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReservationApprov;
