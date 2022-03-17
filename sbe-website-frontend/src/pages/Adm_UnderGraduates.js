import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEdit,
  faTrashAlt,
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
      <div className="container">
        <section className="member-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <div className="member_designation">
                  <br></br>
                  <br></br>
                  <h2>Undergraduate Admission</h2>
                </div>
                <div className="member_desc">
                  {isCoordinator || isModerator || isAdmin ? (
                    <Link
                      className="btn btn-md col-4"
                      style={{ backgroundColor: "#003049", color: "#ffff" }}
                      to="/addAdmission/undergraduate"
                    >
                      <FontAwesomeIcon icon={faCirclePlus} />
                      {"  "}
                      Add Admission
                    </Link>
                  ) : null}
                  <br />
                  {intro.is_active ? (
                    <>
                      {isCoordinator || isModerator || isAdmin ? (
                        <Link
                          to={`/edit-adm/${intro.id}/${intro.title}/${intro.summary}/${intro.is_active}/${intro.category}`}
                          className="fs-6 p-4"
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                          Edit
                        </Link>
                      ) : null}
                      <p>{intro.summary}</p>
                    </>
                  ) : null}
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
                <div className="member_desc">
                  {req.is_active ? (
                    <>
                      <h4>{req.title}</h4>
                      {isCoordinator || isModerator || isAdmin ? (
                        <Link
                          to={`/edit-adm/${req.id}/${req.title}/${req.summary}/${req.is_active}/${req.category}`}
                          className="fs-6 p-4"
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                          Edit
                        </Link>
                      ) : null}
                      <p>{req.summary}</p>
                    </>
                  ) : null}
                </div>
                <div className="row ">
                  <div className="col-lg-6 member_desc">
                    {trans.is_active ? (
                      <>
                        <h4>{trans.title}</h4>
                        {isCoordinator || isModerator || isAdmin ? (
                          <Link
                            to={`/edit-adm/${trans.id}/${trans.title}/${trans.summary}/${trans.is_active}/${trans.category}`}
                            className="fs-6 p-4"
                            style={{ textDecoration: "none", color: "#000" }}
                          >
                            <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}
                            Edit
                          </Link>
                        ) : null}
                        <p>{trans.summary}</p>
                      </>
                    ) : null}
                  </div>
                </div>
                {newAdmissions.map((adm) => {
                  return (
                    <div className="row ">
                      <div className="col-lg-6 member_desc">
                        {adm.is_active ? (
                          <>
                            <h4>{adm.title}</h4>
                            {isCoordinator || isModerator || isAdmin ? (
                              <>
                                <Link
                                  to={`/edit-adm/${adm.id}/${adm.title}/${adm.summary}/${adm.is_active}/${adm.category}`}
                                  className="fs-6 p-4"
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
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
                                      className="fs-5"
                                      icon={faTrashAlt}
                                    />{" "}
                                  </button>
                                </Link>
                              </>
                            ) : null}
                            <p>{adm.summary}</p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Adm_UnderGraduates;
