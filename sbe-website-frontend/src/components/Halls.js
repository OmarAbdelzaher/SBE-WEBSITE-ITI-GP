import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "react-bootstrap/Nav";

import {
  faCalendarCheck,
  faCalendarXmark,
  faGear,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

export default function Halls() {

    const [halls, setHalls] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/halls/")
          .then((res) =>
            setHalls(res.data)
          );
      }, []);

      const deleteHall = (id) => {
        axios
          .delete(`http://localhost:8000/api/hall/${id}`)
          .then((res) => {
            const halls_update = halls.filter((item) => item.id !== id);
            setHalls(halls_update);
          })
          .catch((e) => {
            console.log(e);
          });
      };

      
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
                <p className="fs-3"> Halls Menu</p>
              </div>
              <Nav.Link className="button ">
                <Link className="fs-5 header-link ani" to="/hallform">
                  Add Hall  
                </Link>
              </Nav.Link>

              <div>
                <table className="table table-hover bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>#</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    {halls.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>

                          <td>{item.name}</td>
                          <td>
                            <Link to="#">
                              <button
                                className="btn button"
                                onClick={() => {
                                  deleteHall(item.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faCalendarCheck}
                                />{" "}
                                Delete
                              </button>
                            </Link>

                            <Link to={`/editHallForm/${item.id}/${item.name}`}>
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

// {`/reservationEditHall/${item.id}/${item.date}/${item.timeslot}/hall/${item.hall_id}/${item.staff_id[0]}`}