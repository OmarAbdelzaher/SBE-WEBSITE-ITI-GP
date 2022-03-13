import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function CoursesMenu(isAuthenticated) {
  let flag = false;

  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const person = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && person.user != null && flag == false) {
      if (person.user.role == "dr" || person.user.role == "ta") {
        setIs_staff(true);
        if (person.user.is_coordinator) {
          setIsCoordinator(true);
        }
        flag = true;
      }

      if (person.user.role == "employee") {
        setIsEmp(true);
        if (person.user.is_moderator) {
          setIsModerator(true);
        }
      }

      if (person.user.is_admin) {
        setIsAdmin(true);
      }
    }
  });

  const [formData, setFormData] = useState({
    Year: "year",
    Semester: "semester",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const btnStyle = {
    // color: "white",
    // width: "50%",
    // height: "50%",
    // background:'red',
    // marginTop: "45px",
  };

  return (
    <>
      <section className="h-custom py-5">
        <div className="container ">
          <div className="row justify-content-center align-items-center">
            

            <div className="col-lg-8 col-xl-6">
              <div className=" rounded-3 ">
                <div className=" card form rounded-3 courses-b border border-2 border-light">
                  <div className="card-body">
                  <h3 className="fs-2 ">
                    Students Courses
                  </h3>
                  {isCoordinator || isAdmin ? (
              // <div className="col-lg-2 col-xl-3 align-self-start mt-5 ">
                // <div className="rounded-4 align-items-start justify-content-left  ">
                  <Link
                  className="btn btn-md col-6" style={{backgroundColor:"#003049", color:"#ffff"}}
                    to="/courseform"
                    // style={btnStyle}
                  >
                      <FontAwesomeIcon icon={faCirclePlus} />
                      {"  "}
                      Add Course
                   
                  </Link>
                // </div>
              // </div>
            ) : null}
            </div>
                  <form className="px-md-2">
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label col-12 fs-5 ">
                          Study Year
                        </label>{" "}
                        <select
                          className="select form-control-lg col-12 "
                          onChange={(e) => onChange(e)}
                          name="Year"
                          value={formData.Year}
                        >
                          {/* Default Value */}
                          <option value="0">Please select Your Year</option>
                          {/* Selections values */}
                          <option value="grade1">Year One</option>
                          <option value="grade2">Year Two</option>
                          <option value="grade3">Year Three</option>
                          <option value="grade4">Year Four</option>
                        </select>
                        {/* Year One Selection  */}
                        {formData.Year == "grade1" ? (
                          <>
                            <br />
                            <div>
                              <div>
                                <br></br>
                                <div className="row">
                                  <div className="col-12">
                                    <label className="form-label select-label col-12 fs-5">
                                      Semester
                                    </label>
                                    <select
                                      className="select form-control-lg col-12"
                                      name="Semester"
                                      value={formData.Semester}
                                      onChange={(e) => onChange(e)}
                                    >
                                      <option value="0">
                                        {" "}
                                        Please select Your Term{" "}
                                      </option>

                                      <option value="one">First Term</option>
                                      <option value="two">Second Term</option>
                                    </select>

                                    {/* Year One Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <label htmlFor="one">
                                          You choose year 1 Semester 1{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/one-smesterone"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}

                                    {/* Year One Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <label htmlFor="two">
                                          You choose year 1 Semester 2{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/one-smestertwo"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {/* Year two Selection */}
                        {formData.Year == "grade2" ? (
                          <>
                            <br />
                            <div>
                              <div>
                                <br></br>
                                <div className="row">
                                  <div className="col-12">
                                    <label className="form-label select-label col-12 fs-5">
                                      Semester
                                    </label>
                                    <select
                                      className="select form-control-lg col-12"
                                      name="Semester"
                                      value={formData.Semester}
                                      onChange={(e) => onChange(e)}
                                    >
                                      <option value="0">
                                        Please select Your Term
                                      </option>

                                      <option value="one">First Term</option>
                                      <option value="two">Second Term</option>
                                    </select>

                                    {/* Year two Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <label htmlFor="one">
                                          You choose year 2 Semester 1{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/two-smesterone"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}

                                    {/* Year two Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <label htmlFor="two">
                                          You choose year 2 Semester 2{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/two-smestertwo"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {/* Year Three Selection */}
                        {formData.Year == "grade3" ? (
                          <>
                            <br />
                            <div>
                              <div>
                                <br></br>
                                <div className="row">
                                  <div className="col-12">
                                    <label className="form-label select-label col-12 fs-5">
                                      Semester
                                    </label>
                                    <select
                                      className="select form-control-lg col-12"
                                      name="Semester"
                                      onChange={(e) => onChange(e)}
                                    >
                                      <option value="0">
                                        Please select Your Term
                                      </option>

                                      <option value="one">First Term</option>
                                      <option value="two">Second Term</option>
                                    </select>

                                    {/* Year Three Selection Smester One*/}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <label htmlFor="one">
                                          You choose year 3 Semester 1{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/three-smesterone"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}

                                    {/* Year Three Selection Semester Two  */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <label htmlFor="two">
                                          You choose year 3 Semester 2{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/three-smestertwo"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {/* Year Four Selection */}
                        {formData.Year == "grade4" ? (
                          <>
                            <br />
                            <div>
                              <div>
                                <br></br>
                                <div className="row">
                                  <div className="col-12">
                                    <label className="form-label select-label col-12 fs-5">
                                      Semester
                                    </label>
                                    <select
                                      className="select form-control-lg col-12"
                                      name="Semester"
                                      onChange={(e) => onChange(e)}
                                    >
                                      <option value="0">
                                        Please select Your Term
                                      </option>

                                      <option value="one">First Term</option>
                                      <option value="two">Second Term</option>
                                    </select>
                                    {/* Year Four Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <label htmlFor="one">
                                          You choose year 4 Semester 1{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/four-smesterone"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}

                                    {/* Year Four Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <label htmlFor="two">
                                          You choose year 4 Semester 2{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/four-smestertwo"
                                        >
                                          <button className="button ani  mb-1">
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <br></br>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
{/* 
                    <div className="row">
                      <Link className="button btn btn-lg col-12">
                        <button type="submit" className="button ani ">
                          Show Schedule
                        </button>
                      </Link>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-form"></div>
      </section>
    </>
  );
}
