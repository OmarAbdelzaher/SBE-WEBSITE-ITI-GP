import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function CourseGraduate(isAuthenticated) {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/coursegraduate/")
      .then((res) => setGraduateCourse(res.data));
  }, []);

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
                  {isCoordinator || isAdmin ? (
                      <Link
                        className="btn btn-md col-4"
                        style={{ backgroundColor: "#003049", color: "#ffff" }}
                        to={`/courseform/graduate`}
                      >
                        <FontAwesomeIcon icon={faCirclePlus} />
                        {"  "}
                        Add Course
                      </Link>
                    ) : null}
                </div>
                <div className="row table-b">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                      </tr>
                    </thead>
                    {graduatecourse.map((item) => {
                      return (
                        <>
                        <tbody className="fs-4 mb-3" key={item.id}>
                          <tr className='tr'>
                          <td><Link className='table-b' to={`/courseDetails/${item.id}`}>{item.name}</Link></td>
                          <td><Link to={`/courseDetails/${item.id}`}><FontAwesomeIcon icon={faAnglesRight} style={{color:"#ffff"}}/></Link></td>
                          </tr>
                        </tbody>
                        
                        </>
                      );
                    })}
                     </table>
                </div>
                </div>
             
            </div>
            <div className="c-form py-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
