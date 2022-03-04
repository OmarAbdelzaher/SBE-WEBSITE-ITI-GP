import React from 'react'
import Header from '../components/header'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function CourseDetails() {
    // const params = useParams();
    const [course, setCourse] = useState({});
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/course/${course.id}`)
        .then((res) =>{
            console.log(res.data)
            setCourse(res.data)

        })
    },[]);
  return (
    <>
    <Header/>
        <section className="h-150 h-custom">
        <div className="jumbotron">
          <div className="container">
            <h1 className="lead">{course.name}</h1>
            <p className="lead">Small Description 3n elcourse</p>
            <hr className="my-4" />
            <p className="lead">
              <a className="btn btn-dark btn-lg" href="" target="_blank" role="button">Course Instruction</a>
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
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-dollar fa-stack-1x text-success" />
                    <i className="fa fa-ban fa-stack-2x text-danger" />
                  </span>
                </p>
                <p>

                  <a className="btn btn-dark" to="/coursesMenu" target="_blank" role="button">
                  View Grades <i className="fa fa-chevron-right" aria-hidden="true" />
                  </a>
                </p>
              </div> {/* /.col */}
              <div className="col">
                <h2>Course Materials</h2>
                <p>Small Description 3n elcourse</p>
                <p>
                  <a className="btn btn-dark" href="" target="_blank" role="button">
                    View Materials <i className="fa fa-chevron-right" aria-hidden="true" />
                  </a>
                </p>
              </div> {/* /.col */}
            </div> {/* /.col-md-6 */}
            <div className="col-md-6">
              <div className="col">
                <h2>Course History</h2>
                <p>Small Description 3n elcourse</p>
                <p>
                  <a className="btn btn-dark" href="" target="_blank" role="button">
                    View History <i className="fa fa-chevron-right" aria-hidden="true" />
                  </a>
                </p>
              </div> {/* /.col */}
            </div> {/* /.col-md-6 */}
          </div> {/* /.row */}
          <hr />
        </div> {/* /.container */}
        </section>
    </>
  )
}

export default CourseDetails
