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

  return (
    <>
      <section className="h-custom py-5">
        <div className="container ">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-8 col-xl-6">
              <div className=" rounded-3 ">
                <div className=" card form rounded-3 courses-b border border-2 border-light">
                  <div className="card-body">
                    <h3 className="fs-2 ">Students Courses</h3>
                    {isCoordinator || isAdmin ? (
                      <Link
                        className="btn btn-md col-4"
                        style={{ backgroundColor: "#003049", color: "#ffff" }}
                        to="/courseform/undergraduate"
                      >
                        <FontAwesomeIcon icon={faCirclePlus} />
                        {"  "}
                        Add Course
                      </Link>
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
                          <option value="Year 1">Year One</option>
                          <option value="Year 2">Year Two</option>
                          <option value="Year 3">Year Three</option>
                          <option value="Year 4">Year Four</option>
                        </select>
                        {/* Year One Selection  */}
                        {formData.Year == "Year 1" ? (
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
                                        Please select Your Semester{" "}
                                      </option>

                                      <option value="one">Semester One</option>
                                      <option value="two">Semester Two</option>
                                    </select>

                                    {/* Year One Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="one"
                                            className="col-12 text-center"
                                          >
                                            You choose year 1 Semester 1{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/one-smesterone"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1 "
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
                                      </>
                                    ) : null}

                                    {/* Year One Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="two"
                                            className="col-12 text-center"
                                          >
                                            You choose year 1 Semester 2{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg  col-5"
                                            to="/one-smestertwo"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
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
                        {formData.Year == "Year 2" ? (
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
                                        Please select Your Semester
                                      </option>

                                      <option value="one">Semester One</option>
                                      <option value="two">Semester Two</option>
                                    </select>

                                    {/* Year two Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="one"
                                            className="col-12 text-center"
                                          >
                                            You choose year 2 Semester 1{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/two-smesterone"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
                                      </>
                                    ) : null}

                                    {/* Year two Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="two"
                                            className="col-12 text-center"
                                          >
                                            You choose year 2 Semester 2{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/two-smestertwo"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
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
                        {formData.Year == "Year 3" ? (
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
                                        Please select Your Semester
                                      </option>

                                      <option value="one">Semester One</option>
                                      <option value="two">Semester Two</option>
                                    </select>

                                    {/* Year Three Selection Smester One*/}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="one"
                                            className="col-12 text-center"
                                          >
                                            You choose year 3 Semester 1{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/three-smesterone"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
                                      </>
                                    ) : null}

                                    {/* Year Three Selection Semester Two  */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="two"
                                            className="col-12 text-center"
                                          >
                                            You choose year 3 Semester 2{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/three-smestertwo"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
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
                        {formData.Year == "Year 4" ? (
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
                                        Please select Your Semester
                                      </option>

                                      <option value="one">Semester One</option>
                                      <option value="two">Semester Two</option>
                                    </select>
                                    {/* Year Four Selection Semester One */}
                                    {formData.Semester == "one" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="one"
                                            className="col-12 text-center"
                                          >
                                            You choose year 4 Semester 1{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/four-smesterone"
                                          >
                                            <button
                                              type="submit"
                                              className="button ani  mb-1"
                                            >
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
                                      </>
                                    ) : null}

                                    {/* Year Four Selection Semester Two */}
                                    {formData.Semester == "two" ? (
                                      <>
                                        <div className="d-flex justify-content-center align-items-center row">
                                          <label
                                            htmlFor="two"
                                            className="col-12 text-center"
                                          >
                                            You choose year 4 Semester 2{" "}
                                          </label>
                                          <br />
                                          <br />
                                          <Link
                                            className="button btn btn-lg col-5"
                                            to="/four-smestertwo"
                                          >
                                            <button className="button ani  mb-1">
                                              Show Courses
                                            </button>
                                          </Link>
                                        </div>
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
