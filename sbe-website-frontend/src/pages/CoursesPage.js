import React from 'react'
import Header from '../components/header'
import { useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CoursesPage() {
    const [courses, setCourses] = useState([]);
        useEffect(() => {
            axios
                .get("http://localhost:8000/api/courses/")
                .then((res) => {
                    setCourses(res.data)

                })
     }, []);
  return (
    <>
    <Header/>
    <section className="h-150 h-custom">
         <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Students Courses</h3>
                </div>
                <div className="row">
                {courses.map((course) => {
                    return (
                    <div className="card text-white bg-secondary mb-3" key={course.id}>
                <Link className="nav-links btn-lg mb-1" to={`/courseDetails/${course.id}`}>
                  <h2 className="pt-3 text-170 text-600 text-primary-d1 letter-spacing">
                  {course.name}
                  </h2></Link>
                      </div>
                  );
              })}
          </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CoursesPage

