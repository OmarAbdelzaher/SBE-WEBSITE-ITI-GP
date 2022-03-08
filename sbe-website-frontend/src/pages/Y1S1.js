import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function YoneSone() {
  const [courses, setCourses] = useState([]);
  const [coursesone, setCoursesone] = useState([false]);
const semesterone=false
  useEffect(() => {
    // coursesone=true
    axios
      .get("http://localhost:8000/api/courseungraduateyearone/")
      .then((res) => {
        setCourses(res.data)

      })
  }, []);
  // useEffect(() => {
  //   // semestertwo=True
  //   axios
  //     .get("http://localhost:8000/api/courseungraduateyearone/")
  //     .then((res) => {
  //       setCourses(res.data)

  //     })
  // }, []);
  return (
    <>
    {coursesone?(<section className="h-custom py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body p-4 p-md-5">
                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Students Courses Year One</h1>
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
                  .filter(course => course.semester === 1)
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
      </section>):'That is Wrong'}

      
    </>
  )
}

export default YoneSone

//  {/* <tbody>
//                     <tr>
//                     <Link className="nav-links btn-lg mb-1" to={`/courseDetails/${course.id}`}>
//                     <h1>{course.id}</h1>
//                   <h2 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
//                   {course.name}
//                   </h2></Link>
//                     </tr>
//                   </tbody> */}