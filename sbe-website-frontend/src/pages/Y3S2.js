import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight} from "@fortawesome/free-solid-svg-icons";

export default function YthreeStwo() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courseungraduateyearthree/")
      .then((res) => setCourses(res.data.filter((course)=>course.category=='undergraduate')))
        // setCourses(res.data)

      
  }, []);
  return (
    <>
      <section className="h-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body">
                    <h1 className="mb-4 pb-2 pb-md-0 px-md-2">Year Three Courses </h1>
                </div>
                <div className="row table-b">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                      </tr>
                    </thead>
                  
                  {courses
                  .filter(course => course.semester === 'two')

                  .map((course) => {
                    return (
                        <tbody className="mb-3" key={course.id}>
                          <tr className='tr'>
                            <td><Link className='table-b'  to={`/courseDetails/${course.id}`}>{course.name}</Link></td>
                            <td><Link to={`/courseDetails/${course.id}`}><FontAwesomeIcon icon={faAnglesRight} style={{color:"#ffff"}}/></Link></td>
                          </tr>
                        </tbody>
                    );
                  })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-form"></div>
      </section>
    </>
  )
}

