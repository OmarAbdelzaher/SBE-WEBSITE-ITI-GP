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

export default function Labs() {

    const [labs, setLabs] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/labs/")
          .then((res) =>
            setLabs(res.data)
          );
      }, []);

      const deleteLab = (id) => {
        axios
          .delete(`http://localhost:8000/api/lab/${id}`)
          .then((res) => {
            const labs_update = labs.filter((item) => item.id !== id);
            setLabs(labs_update);
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
                <p className="fs-3"> Labs Menu</p>
              </div>
              <Nav.Link className="button ">
                <Link className="fs-5 header-link ani" to="/labform">
                  Add Lab  
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
                    {labs.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>

                          <td>{item.name}</td>
                          <td>
                            <Link to="#">
                              <button
                                className="btn button"
                                onClick={() => {
                                  deleteLab(item.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faCalendarCheck}
                                />{" "}
                                Delete
                              </button>
                            </Link>

                            <Link to={`/editLabForm/${item.id}/${item.name}`}>
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