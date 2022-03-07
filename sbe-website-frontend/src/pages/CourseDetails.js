import React from "react";
import {  Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function CourseDetails() {



  const params = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/course/${params.id}`)
      .then((res) => {
        setCourse(res.data)

      })
  }, []);
  return (
    <>
      <section className=" h-custom py-5">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body p-4 p-md-5">
                  <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 bg-light rounded text-center nav-links border border-dark">{course.name}</h1>
                </div>

                <div className="row justify-content-center align-items-center">

                <div className="row col-6  ">
                <div className="col-12 card cards justify-content-center align-items-center ">
                  <h2 className="col-12 card-title bg-light py-3 text-dark">Course Instructions</h2>
                  <p className="col-12 card-text fs-4 text-dark">{course.instructions}</p>
                </div>
              
                
                <div className="btn button col-12 card cards justify-content-center align-items-center ">
                <Link className="btn button fs-4" to={`/course-history/${course.id}`}>
               Show Course History
                </Link>
                </div>
                </div>

                <div className=" row col-4 offset-1">
                  <div className="row card cards col-10 text-center border border-2 ">
                    <h3 className="card-body col-12 nav-links">Materials</h3>
                    <p className="card-text col-12 text-dark">{course.materials}</p>
                    <button className="btn btn-lg col-12 button">
                      <a className="button nav-links text-light" href={course.materials} download>Download</a>
                    </button>
                  </div>
                  <div className="row card cards col-10 text-center border border-2 ">
                    <h3 className="card-body col-12 nav-links">Grades</h3>
                    <p className="card-text col-12 text-dark">Download Students Grades</p>
                    <button className="btn btn-lg col-12 button">
                      <a className="button nav-links text-light" href={course.stds_grades} download>Download</a>
                    </button>
                  </div>
                  {/* <div className="row card cards col-10 text-center border border-2 ">
                    <h3 className="card-body col-12 nav-links">Schedule</h3>
                    <p className="card-text col-12 text-dark">Download Course Schedule</p>
                    <button className="btn btn-lg col-12 button">
                      <a className="button nav-links text-light" href={course.schedule} download>Download</a>
                    </button>
                  </div> */}

                </div>
                </div>
               
                {/* <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Course Materials</h2>
                  <p className="col-4">{course.materials}</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.materials} download>Download</a>
                    </button>
                </div>
                <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Students Grades</h2>
                  <p className="col-4">Download Students Grades</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.stds_grades} download>Download</a>
                    </button>
                </div>
                <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Students Grades</h2>
                  <p className="col-4">Download Course Schedule</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.schedule} download>Download</a>
                    </button>
                </div> */}
               

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetails;
