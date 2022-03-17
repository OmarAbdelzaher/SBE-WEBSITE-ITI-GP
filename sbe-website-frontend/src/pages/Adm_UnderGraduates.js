import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const Adm_UnderGraduates = (isAuthenticated) => {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [intro, setIntro] = useState({
    title:"",
    summary:"",
    is_active:"",
    category:""
  });

  const [req, setReq] = useState({
    title:"",
    summary:"",
    is_active:"",
    category:""
  });
  const [trans, setTrans] = useState({
    title:"",
    summary:"",
    is_active:"",
    category:""
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/admissions/").then((res) => {
      let undergraduateAdmissions = res.data.filter(
        (admission) => admission.category == "undergraduate"
      );
      setIntro(
        undergraduateAdmissions.filter((intro) => intro.title == "Introduction")[0]
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
                  <br/>
                    {intro.is_active ?
                      <>
                        <Link to={`/edit-adm/${intro.id}/${intro.title}/${intro.summary}/${intro.is_active}/${intro.category}`} className="fs-6 p-4" style={{ textDecoration:"none", color:"#000" }}>
                        <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}Edit</Link>
                        <p>
                          {intro.summary} 
                        </p>
                      </> 
                    : null}
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
                  <h4>{req.title}</h4>
                  <p>
                    {req.is_active ? req.summary : null}
                  </p>
                </div>
                <div className="row ">
                  <div className="col-lg-6 member_desc">
                    <h4>{trans.title}</h4>
                    <p>
                      {trans.is_active ? trans.summary : null}
                    </p>
                  </div>
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
