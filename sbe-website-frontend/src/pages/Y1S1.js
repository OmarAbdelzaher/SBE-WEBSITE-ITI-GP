import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight} from "@fortawesome/free-solid-svg-icons";

function YoneSone() {
  const [courses, setCourses] = useState([]);
  // var flag=false
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courseungraduateyearone/")
      .then((res) =>  setCourses(res.data.filter((course)=>course.category=='undergraduate')))

        // .then((res) => setEmp(res.data.filter((e) => e.is_active == false)));
        // res.filter(function(courses) {
        //   return courses.category == 'undergraduate';
        // });
       
      
  }, []);
  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-3 col-xl-6 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body ">
                    <h1 className="mb-4 pb-2 pb-md-0 px-md-2 ">Year One Courses</h1>
                </div>
                <div className="row table-b">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                      </tr>
                    </thead>
                
                  {courses
                  .filter(course => course.semester === 'one')
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