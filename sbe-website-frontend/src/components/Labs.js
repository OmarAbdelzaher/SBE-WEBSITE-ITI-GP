import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Labs() {
  const [labs, setLabs] = useState([]);
  const moderator = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/labs/")
      .then((res) => setLabs(res.data));
  }, []);


  if(moderator.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (moderator.user != null )
  {
    if (moderator.user.role == false && moderator.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }

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
      <section className="main ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body">
                <p className="fs-1 text-light"> Labs Menu</p>
                <Link
                  className="btn btn-md col-3"
                  style={{ backgroundColor: "#003049", color: "#ffff" }}
                  to="/labform"
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                  {"  "}
                  Add Lab
                </Link>
              </div>

              <div>
                <table className="table table-hover bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>#</th>
                      <th className="text-dark fw-light">Name</th>
                      <th className="text-dark fw-light">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    {labs.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>

                          <td>{item.name}</td>
                          <td>
                            <Link to={`/editLabForm/${item.id}/${item.name}`}>
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
                                style={{ backgroundColor: "red" }}
                                className="btn btn-sm"
                                onClick={() => {
                                  deleteLab(item.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "white" }}
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
