import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CourseHistory = () => {
    const [coursehistory, setCoursesHistory] = useState([]);
    const [coureName, setCourseName] = useState();
    const params = useParams();
    const courseID = params.id;
  
    useEffect(() => {
        axios.get(`http://localhost:8000/api/coursehistory/`).then((res) => {
            let history = res.data.filter((history) => history.course_id == courseID);
            setCoursesHistory(history);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/course/${courseID}`).then((res) => {
            setCourseName(res.data.name)
        });
    }, []);
    return (
    <>
      <section className=" h-custom py-5">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body p-4 p-md-5">
                  <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 bg-light rounded text-center nav-links border border-dark">
                    History of {coureName}
                  </h1>
                </div>

                {coursehistory.map((item) => {
                  return (
                    <>
                      <div
                        className="row justify-content-center align-items-center "
                        key={item.course_id}
                      >
                        <h2 className="bg-light py-3 nav-links">Year</h2>{" "}
                        <p>{item.year}</p>
                        <h3 className="col-12">Doctor Name {item.staff_id}</h3>
                        <p className="col-4">
                          Download Materials {item.material}{" "}
                        </p>
                        <button className="btn btn-lg col-6 button">
                          Download
                        </button>
                        <h1>Course ID : {item.course_id}</h1>
                        <h1>Course History ID : {item.id}</h1>
                      </div>
                    </>
                  );
                })}

                {/* <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2>
                                            <h3 className='col-12'>Doctor Name</h3>
                                            <p className="col-4">Download Materials</p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                            </button>

                                        </div> */}

                {/* );
                                })} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseHistory;
