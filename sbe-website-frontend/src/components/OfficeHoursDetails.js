import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarXmark,
  faGears,
  faTrash,
  faTrashCan,
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from 'react-router-dom';


export default function OfficeHoursDetails(params) {
  const staff = useSelector((state) => state.auth);
  const [officehours, setOfficeHours] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8000/api/officehours/").then((res) => {
      setOfficeHours(res.data);
    });
  }, []);

  useEffect(() => {
    if (staff.user != null && officehours != undefined) {
      setOfficeHours(officehours.filter((oh) => oh.staff_id == staff.user.id));
    }
  }, []);

  if(staff.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (staff.user != null )
  {
    if (staff.user.role != "ta" && staff.user.role != "dr"  && staff.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }


  const deleteOfficeHour = (id) => {
    axios
      .delete(`http://localhost:8000/api/officehourdetails/${id}`)
      .then((res) => {
        const officehours_update = officehours.filter((item) => item.id !== id);
        setOfficeHours(officehours_update);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="card-body ">
                <p className="fs-2 text-light">OfficeHours Schedule</p>
                <Link className="btn btn-lg col-3" style={{backgroundColor:"#003049", color:"#ffff"}} to={"/officehours"}>
                <FontAwesomeIcon icon={faCirclePlus } />{"  "} 
                  Add Office Hours 
                </Link>
              </div>

              <table class="table table-hover bg-light fs-4 col-12">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">#</th>
                    <th scope="col" className="text-dark fw-light">OfficeHour Type</th>
                    <th scope="col" className="text-dark fw-light">Week Day</th>
                    <th scope="col" className="text-dark fw-light">From</th>
                    <th scope="col" className="text-dark fw-light">To</th>
                    <th scope="col" className="text-dark fw-light">Actions</th>
                  </tr>
                </thead>
                <tbody className="mb-3">
                  {officehours != undefined
                    ? officehours.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="admin-tables">
                              {item.officehours_type}
                            </td>
                            <td className="admin-tables">{item.weekday}</td>
                            <td className="admin-tables">{item.from_hour}</td>
                            <td className="admin-tables">{item.to_hour}</td>
                            <td className="admin-tables">
                              <Link to={`/officehoursEdit/${item.id}`}>
                                <button className="btn button">
                                  <FontAwesomeIcon
                                    className="fs-5"
                                    icon={faGears}
                                  />{" "}
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="btn"
                                style={{
                                  background: "#ae2012",
                                  color: "white",
                                }}
                                onClick={() => deleteOfficeHour(item.id)}
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
                                  icon={faTrashCan}
                                />{" "}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            <div className="margin-bottom"></div>
          </div>
        </div>
      </section>
    </>
  );
}
