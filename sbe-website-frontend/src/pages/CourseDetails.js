import React from "react";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CourseDetails() {
  // const params = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8000/api/course/${course.pk}`).then((res) => {
      console.log(res.data);
      setCourse(res.data);
    });
  }, []);
  return (
    <>
      <section className="h-custom d">
        <div className="course-d">
          <div className="jumbotron">
            <div className="container">
              <h2>Course Instruction</h2>
              <p className="col">
                Small Description 3n elcourse
              Small Description 3n elcourse
              Small Description 3n elcourse
              </p>
              <hr className="my-4" />
              <p className="lead">
                <Link
                  className="btn btn-dark btn-lg"
                  href=""
                  target="_blank"
                  role="button"
                >
                  Course Instruction
                </Link>
              </p>
            </div>
          </div>
          <div className="container">
            {/* Example row of columns */}
            <div className="row">
              <div className="col-md-6">
                <div className="col">
                  <h2>Course Grades</h2>
                  <p>
                    Small Description 3n elcourse
                    Small Description 3n elcourse
                    Small Description 3n elcourse
                    Small Description 3n elcourse
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-dollar fa-stack-1x text-success" />
                      <i className="fa fa-ban fa-stack-2x text-danger" />
                    </span>
                  </p>
                  <p>
                    <Link
                      className="btn btn-dark"
                      to="/coursesMenu"
                      target="_blank"
                      role="button"
                    >
                      View Grades{" "}
                      <i className="fa fa-chevron-right" aria-hidden="true" />
                    </Link>
                  </p>
                </div>{" "}
                {/* /.col */}
                <div className="col">
                  <h2>Course Materials</h2>
                  <p>Small Description 3n elcourse</p>
                  <p>
                    <Link
                      className="btn btn-dark"
                      href=""
                      target="_blank"
                      role="button"
                    >
                      View Materials{" "}
                      <i className="fa fa-chevron-right" aria-hidden="true" />
                    </Link>
                  </p>
                </div>{" "}
                {/* /.col */}
                <div className="col-md-6">
                  <div className="col">
                    <h2>Course History</h2>
                    <p>Small Description 3n elcourse</p>
                    <p>
                      <Link
                        className="btn btn-dark"
                        href=""
                        target="_blank"
                        role="button"
                      >
                        View History{" "}
                        <i className="fa fa-chevron-right" aria-hidden="true" />
                      </Link>
                    </p>
                  </div>{" "}
                </div>{" "}
                {/* /.col-md-6 */}
                {/* /.col */}
              </div>{" "}
              {/* /.col-md-6 */}
            </div>{" "}
            {/* /.row */}
            <hr />
          </div>{" "}
          {/* /.container */}
        </div>
      </section>
    </>
  );
}

export default CourseDetails;
