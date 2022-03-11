import React from 'react'
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserGear, faUserXmark } from "@fortawesome/free-solid-svg-icons";

function Users() {
  return (
    <>
     <section className="h-custom main">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body ">
                <p className="fs-1 text-light"> SBE DEPARTMENT</p>
                <p className="fs-3 text-light"> - Users</p>

              </div>
              <div>
                <table className="table table-bordered border-primary bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>ID</th>
                      <th>Mail</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    <tr>
                      <td>
                        <Link className="admin-tables">1 </Link>
                      </td>
                      <td>
                        <Link className="admin-tables">
                          {" "}
                          Noura@example.com{" "}
                        </Link>
                      </td>
                      <td>
                        <Link className="admin-tables"> Noura</Link>
                      </td>
                      <td>
                        <Link className="admin-tables"> Ibraheem</Link>
                      </td>
                      <td>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faUserGear}
                            />{" "}
                            Edit
                          </button>
                        </Link>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faUserXmark}
                            />{" "}
                            Delete
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
  )
}

export default Users
