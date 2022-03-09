import React from "react";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faGear,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

function ReservationApprov() {
  return (
    <>
      <section className="h-custom ">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body ">
                <p className="fs-1"> SBE DEPARTMENT</p>
                <p className="fs-3"> - Reservation Menu</p>

              </div>

              <div>
                <table className="table table-hover bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>Device ID</th>
                      <th>Staff ID</th>
                      <th>Date</th>
                      <th>Timeslot</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    <tr>
                      <td>
                        <Link className="admin-tables">1 </Link>
                      </td>
                      <td>
                        <Link className="admin-tables"> 2</Link>
                      </td>
                      <td>
                        <Link className="admin-tables"> 18-01-2022</Link>
                      </td>
                      <td>
                        <Link className="admin-tables"> 8:30 - 10:00 AM</Link>
                      </td>
                      <td>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faCalendarCheck}
                            />{" "}
                            Approved
                          </button>
                        </Link>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faCalendarXmark}
                            />{" "}
                            Rejected
                          </button>
                        </Link>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faGear}
                            />{" "}
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
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
