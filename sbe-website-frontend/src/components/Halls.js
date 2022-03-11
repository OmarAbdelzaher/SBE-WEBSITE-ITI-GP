import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
      <section className="main">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body ">
                <p className="fs-1 text-light">Halls Menu</p>

                <Link to="/hallform" className="btn btn-md col-3" style={{backgroundColor:"#003049", color:"#ffff"}}>
                <FontAwesomeIcon icon={faCirclePlus } />{"  "} 

                  Add Hall  
                </Link>
             
              </div>
           

              <div>
                <table className="table table-hover bg-light fs-4 col-12">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-dark fw-light">Name</th>
                      <th className="text-dark fw-light">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    {halls.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>

                          <td>{item.name}</td>
                          <td>
                         

                            <Link to={`/editHallForm/${item.id}/${item.name}`}>
                              <button className="btn button">
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faGear}
                                />{" "}
                                Edit
                              </button>
                            </Link> 
                            <Link to="#">
                              <button
                                style={{backgroundColor:"red"}}
                                className="btn btn-sm"
                                onClick={() => {
                                  deleteHall(item.id);
                                }}
                              >
                                <FontAwesomeIcon
                                style={{color:"white"}}
                                  className="fs-5"
                                  icon={faTrashAlt}
                                />{" "}
                               
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