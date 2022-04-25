import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function CourseGraduate(isAuthenticated) {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const [formData, setFormData] = useState({
    ChosenYear: "",
    Year: "year",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // console.log(formData.ChosenYear)

  useEffect(() => {
    if (isAuthenticated && who.user != null && flag == false) {
      if (who.user.role == "dr" || who.user.role == "ta") {
        setIs_staff(true);
        if (who.user.is_coordinator) {
          setIsCoordinator(true);
        }
        flag = true;
      }

      if (who.user.role == "employee") {
        setIsEmp(true);
        if (who.user.is_moderator) {
          setIsModerator(true);
        }
      }

      if (who.user.is_admin) {
        setIsAdmin(true);
      }
    }
  });

  const [graduatecourse, setGraduateCourse] = useState([]);
  const [courseyear, setCourseYear] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/graduatecourse/")
      .then((res) => setGraduateCourse(res.data));
  }, []);

  useEffect(() => {
    let arr = graduatecourse.filter((item) => item.year == formData.Year);
    console.log(arr.length);
    if (arr.length > 0) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [formData]);

  let minOffset = 0,
    maxOffset = 10;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }
  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-8 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body">
                  <h1 className="mb-4 pb-2 pb-md-0 px-md-2">
                    Graduate Courses
                  </h1>
                  <div className="container">
                    <div className="row">
                      {isCoordinator || isAdmin ? (
                        <Link
                          className="btn btn-md col-4"
                          style={{ backgroundColor: "#003049", color: "#ffff" }}
                          to={`/coursegradform`}
                        >
                          <FontAwesomeIcon icon={faCirclePlus} />
                          {"  "}
                          Add Course
                        </Link>
                      ) : null}
                    </div>
<br/>
                    <select
                      className="select form-control-lg col-6 "
                      onChange={(e) => onChange(e)}
                      name="Year"
                      value={formData.Year}
                    >
                      {/* Default Value */}
                      <option value="0">Please select Your Year</option>
                      {/* Selections values */}
                      {allYears.map((item) => {
                        return (
                          <>
                            <option
                              href="#/action-2"
                              style={{ position: "relative", zIndex: "100" }}
                              value={item}
                            >
                              {" "}
                              {item}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {console.log(formData.Year)}
                {isAvailable ? (
                  <div className="row table-b">
                    <table className="text-light table table-hover fs-4">
                      <thead>
                        <tr>
                          <th>Course Name</th>
                        </tr>
                      </thead>

                      {graduatecourse
                        .filter((item) => item.year == formData.Year)
                        .map((item) => {
                          return (
                            <>
                              <tbody className="fs-4 mb-3" key={item.id}>
                                <tr className="tr">
                                  <td>
                                    <Link
                                      className="table-b"
                                      to={`/gradcoursedetails/${item.id}`}
                                    >
                                      {item.name} {item.year}
                                    </Link>
                                  </td>
                                  <td>
                                    <Link to={`/gradcoursedetails/${item.id}`}>
                                      <FontAwesomeIcon
                                        icon={faAnglesRight}
                                        style={{ color: "#ffff" }}
                                      />
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                    </table>
                  </div>
                ) : (
                  <h4>No available Courses For {formData.Year}</h4>
                )}
              </div>
            </div>

            <div className="c-form py-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
