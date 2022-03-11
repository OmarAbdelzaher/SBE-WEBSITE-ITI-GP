import React, { useEffect, useState } from "react";
import axios from "axios";
import { reset_password } from "../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ReservationSchedule() {
  const [hallReservations, setHallReservations] = useState();
  const [labReservations, setLabReservations] = useState();
  const [deviceReservations, setDeviceReservations] = useState();
  const [reservations, setReservations] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservedhalls/")
      .then((res) => setHallReservations(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reservedlabs/")
      .then((res) => setLabReservations(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reserveddevices/")
      .then((res) => setDeviceReservations(res.data));
  }, []);

  function onChange(e) {
    if (e.target.value == "halls") {
      setReservations(hallReservations);
    } else if (e.target.value == "labs") {
      setReservations(labReservations);
    } else if (e.target.value == "devices") {
      setReservations(deviceReservations);
    } else if (e.target.value == "Reservation Types") {
      alert("Choose a proper Reservation Type");
    }
  }

  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="card-body ">
                <p className="fs-2 text-light">Reservation Schedule</p>

                <div className=" justify-content-center">
                  <select
                  style={{backgroundColor:"#003049", color:"#ffff"}}
                    className="select form-control-lg btn btn-lg col-3"
                    onChange={(e) => onChange(e)}
                    name="ReserveType"
                    value={reservations}
                  >
                    <option selected value="Reservation Types">
                      Reservation Types
                    </option>
                    <option value="halls">Halls Reservations</option>
                    <option value="labs">Labs Reservations</option>
                    <option value="devices">Devices Reservations</option>
                  </select>
                </div>
              </div>

              <table class="table table-hover bg-light fs-4 col-12 ">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">#</th>
                    <th scope="col" className="text-dark fw-light">Name</th>
                    <th scope="col" className="text-dark fw-light">Reserved By</th>
                    {/* <th scope="col">Confirmed By</th> */}
                    <th scope="col" className="text-dark fw-light">Date</th>
                    <th scope="col" className="text-dark fw-light">Slot</th>
                    <th scope="col" className="text-dark fw-light">Confirmed</th>
                  </tr>
                </thead>
                <tbody className="mb-3">
                  {reservations != undefined
                    ? reservations.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              {item.hall_id ? <td>{item.hall_id}</td> : null}
                              {item.lab_id ? <td>{item.lab_id}</td> : null}
                              {item.device_id ? (
                                <td>{item.device_id}</td>
                              ) : null}
                              <td className="admin-tables">{item.staff_id}</td>
                              {/* <td>{}</td> */}
                              <td className="admin-tables">{item.date}</td>
                              <td className="admin-tables">{item.timeslot}</td>
                              <td className="admin-tables text-center">
                                {item.is_confirmed ? (
                                  <FontAwesomeIcon
                                  style={{color:'green' }}
                                    className="fs-2 "
                                    icon={faCircleCheck}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                  style={{color:'red'}}
                                    className="fs-2"
                                    icon={faCircleXmark}
                                  />
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  );
}
