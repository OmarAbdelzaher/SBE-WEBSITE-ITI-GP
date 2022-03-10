import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function YfourStwo() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courseungraduateyearfour/")
      .then((res) => setCourses(res.data.filter((course)=>course.category=='undergraduate')))
        // setCourses(res.data)

      
  }, []);
  return (
    <>
      <section className="h-custom py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body p-4 p-md-5">
                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Students Courses Year Four</h1>
                </div>
                <div className="row table-b">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                      </tr>
                    </thead>
                  
                  {courses
                  .filter(course => course.semester === 'two')

                  .map((course) => {
                    return (
                        <tbody className="mb-3" key={course.id}>
                          <tr className='tr'>
                            <td><Link className='table-b ' to={`/courseDetails/${course.id}`}>{course.id}</Link></td>
                            <td><Link className='table-b'  to={`/courseDetails/${course.id}`}>{course.name}</Link></td>
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

