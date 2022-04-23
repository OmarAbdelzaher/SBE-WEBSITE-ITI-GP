import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBuildingColumns,
  faEdit,
  faHandHoldingMedical,
  faPlus,
  faTrashAlt,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

const Adm_UnderGraduates = (isAuthenticated) => {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [newAdmissions, setNewAdmissions] = useState([]);

  const [intro, setIntro] = useState({
    title: "",
    summary: "",
    is_active: "",
    category: "",
  });

  const [req, setReq] = useState({
    title: "",
    summary: "",
    is_active: "",
    category: "",
  });
  const [trans, setTrans] = useState({
    title: "",
    summary: "",
    is_active: "",
    category: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/admissions/").then((res) => {
      let undergraduateAdmissions = res.data.filter(
        (admission) => admission.category == "undergraduate"
      );
      setIntro(
        undergraduateAdmissions.filter(
          (intro) => intro.title == "Introduction"
        )[0]
      );
      setReq(
        undergraduateAdmissions.filter(
          (intro) => intro.title == "General Requirements"
        )[0]
      );
      setTrans(
        undergraduateAdmissions.filter(
          (intro) => intro.title == "Transfer Student"
        )[0]
      );
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/admissions/").then((res) => {
      setNewAdmissions(res.data.filter((adm) => adm.id > 3));
    });
  });
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

  const deleteAdmission = (id) => {
    axios
      .delete(`http://localhost:8000/api/admission/${id}`)
      .then((res) => {
        const admissions_update = newAdmissions.filter(
          (item) => item.id !== id
        );
        setNewAdmissions(admissions_update);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="container py-5">
        <section className="member-details ">
          <div className="container d-flex justify-content-center align-items-center">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 col-md-8  shadow-lg">
                <div className="member_designation">
                  <br></br>
                  <br></br>
                  <h2
                    className=" text-center"
                    style={{
                      color: "#003049",
                      fontSize: "50px",
                      fontWeight: "900",
                      fontFamily: "fantasy",
                    }}
                  >
                    Undergraduate Admission
                  </h2>
                </div>
                <div className="member_desc">
                  {isCoordinator || isModerator || isAdmin ? (
                    <div className="text-start col-12">
                      <Link
                        className="btn btn-md col-3 fs-5"
                        style={{ backgroundColor: "#ffff", color: "#003049" }}
                        to="/addAdmission/undergraduate"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        {"  "}
                        Add Admission
                      </Link>
                    </div>
                  ) : null}
                  <br />

                  {intro != null ? intro.is_active ? (
                    <>
                      {isCoordinator || isModerator || isAdmin ? (
                        <div className="text-end">
                          <Link
                            to={`/edit-adm/${intro.id}/${intro.title}/${intro.summary}/${intro.is_active}/${intro.category}`}
                            className="fs-6 p-4 "
                            style={{ textDecoration: "none", color: "#003049" }}
                          >
                            <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                            Edit
                          </Link>
                        </div>
                      ) : null}
                      <div className="col-12 text-center">
                        <p className=" fs-6" style={{ color: "#023047", fontFamily:"fantasy" }}>
                          {" "}
                          {intro.summary}
                        </p>
                      </div>
                    </>
                  ) : null : null}
                </div>
                <img
                  src="https://www.t8wealth.com/wp-content/uploads/2021/08/blog_3.jpeg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div className="member_desc p-3">
                  {req != null ? req.is_active ? (
                    <>
                      <h4
                        className="text-start "
                        style={{
                          color: "#003049",
                          fontSize: "35px",
                          fontWeight: "900",
                          fontFamily: "fantasy",
                        }}
                      >
                        {req.title}
                      </h4>
                      {isCoordinator || isModerator || isAdmin ? (
                        <div className="text-end ">
                          <Link
                            to={`/edit-adm/${req.id}/${req.title}/${req.summary}/${req.is_active}/${req.category}`}
                            className="fs-6 p-4"
                            style={{ textDecoration: "none", color: "#003049" }}
                          >
                            <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                            Edit
                          </Link>
                        </div>
                      ) : null }
                      <div className="col-12 ">
                        <p className="fs-6" style={{ color: "#023047",fontFamily:"fantasy"  }}>
                          {req.summary}
                        </p>
                      </div>
                    </>
                  ) : null : null}
                </div>{" "}
                <br />
                <div className="member_desc p-3">
                  { trans != null ? trans.is_active ? (
                    <>
                      <h4
                        className="text-start "
                        style={{
                          color: "#003049",
                          fontSize: "35px",
                          fontWeight: "900",
                          fontFamily: "fantasy",
                        }}
                      >
                        {trans.title}
                      </h4>
                      {isCoordinator || isModerator || isAdmin ? (
                        <div className="text-end">
                          <Link
                            to={`/edit-adm/${trans.id}/${trans.title}/${trans.summary}/${trans.is_active}/${trans.category}`}
                            className="fs-6 p-4"
                            style={{ textDecoration: "none", color: "#003049" }}
                          >
                            <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                            Edit
                          </Link>
                        </div>
                      ) : null}
                      <div className="col-12">
                        <p className="fs-6" style={{ color: "#023047",fontFamily:"fantasy"  }}>
                          {trans.summary}
                        </p>
                      </div>
                    </>
                  ) : null : null}
                </div>
                <div className="py-5  d-flex justify-content-center align-items-center col-12">
                  <div className="col-4 d-flex justify-content-center align-items-center  border-end border-2 ">
                    <FontAwesomeIcon
                      icon={faAward}
                      style={{ color: "#168aad", fontSize: "90px" }}
                    />{" "}
                  </div>
                  <div className="col-4 d-flex justify-content-center align-items-center   border-end border-2 ">
                    <FontAwesomeIcon
                      icon={faBuildingColumns}
                      style={{ color: "#168aad", fontSize: "90px" }}
                    />{" "}
                  </div>
                  <div className="col-4 d-flex justify-content-center align-items-center py-5">
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      style={{ color: "#168aad", fontSize: "90px" }}
                    />{" "}
                  </div>
                </div>
                <div className="row p-3">
                  {newAdmissions.map((adm) => {
                    return (
                      <div className="member_desc col-12  row ">
                        {adm != null ? adm.is_active ? (
                          <>
                            <h4
                              className="text-start col-6"
                              style={{
                                color: "#003049",
                                fontSize: "35px",
                                fontWeight: "900",
                                fontFamily: "fantasy",
                              }}
                            >
                              {adm.title}
                            </h4>
                            {isCoordinator || isModerator || isAdmin ? (
                              <>
                                <div className="text-end col-6">
                                  <Link
                                    to={`/edit-adm/${adm.id}/${adm.title}/${adm.summary}/${adm.is_active}/${adm.category}`}
                                    className="fs-6 p-4"
                                    style={{
                                      textDecoration: "none",
                                      color: "#003049",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      className="fs-6"
                                      icon={faEdit}
                                    />{" "}
                                    Edit
                                  </Link>
                                  <Link to="#">
                                    <button
                                      style={{ backgroundColor: "red" }}
                                      className="btn btn-sm"
                                      onClick={() => {
                                        deleteAdmission(adm.id);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        style={{ color: "white" }}
                                        className="fs-6"
                                        icon={faTrashAlt}
                                      />{" "}
                                    </button>
                                  </Link>
                                </div>
                              </>
                            ) : null}
                            <div className="col-12">
                              <p className=" fs-6" style={{ color: "#023047",fontFamily:"fantasy"  }}>
                                {" "}
                                {adm.summary}
                              </p>
                            </div>
                          </>
                        ) : null : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Adm_UnderGraduates;
