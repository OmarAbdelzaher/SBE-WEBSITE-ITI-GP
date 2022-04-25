import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";


const CourseHistoryGrad = () => {
    const [coursehistory, setCoursesHistory] = useState([]);
    const [coureName, setCourseName] = useState();
    const params = useParams();
    const courseID = params.id;
  
    useEffect(() => {
        axios.get(`http://localhost:8000/api/coursegradhistory/`).then((res) => {
            let history = res.data.filter((history) => history.course_id == courseID);
            setCoursesHistory(history);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/graduatecourse/${courseID}`).then((res) => {
            setCourseName(res.data.name)
        });
    }, []);
    return (
    <>
      <section className="h-custom">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-10 card rounded-3 courses-b border border-2 border-light">
              <div>
                <div className="card-body p-4 p-md-5">
                  <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 bg-light rounded text-center nav-links border border-dark">
                    History of {coureName}
                  </h1>
                </div>
                <div className="row ">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Staff</th>
                        <th>Material Link</th>
                      </tr>
                    </thead>

                {coursehistory.map((item) => {
                  return (
                    <>
                      <tbody
                        className="mb-3 fs-4"
                        key={item.course_id}
                      >
                        <tr className="tr">
                        <td className='table-b'>{item.year}</td>{" "}
                        <td className="table-b">{`${item.staff_id }`}</td>
                        <td><a href={item.materials} style={{ color: "#ffff", textDecoration:"none" }}>
                        <FontAwesomeIcon icon={faLink} /> {" "}
                        Click To Materials Link </a></td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
                 </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin-b"></div>
      </section>
    </>
  );
};

export default CourseHistoryGrad;
