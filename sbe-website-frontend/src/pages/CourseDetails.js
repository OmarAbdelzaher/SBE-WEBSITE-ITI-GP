import React from 'react'
import Header from '../components/header'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function CourseDetails() {
    const params = useParams();
    const [course, setCourse] = useState({});
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/course/${params.id}`)
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
            <p className="lead">Course Description</p>
            <hr className="my-4" />
            <p className="lead">
              <a className="btn btn-dark btn-lg" href="" target="_blank" role="button">Course Grades</a>
              <h1 className="lead">{course.stds_grades}</h1>
              <a className="btn btn-dark btn-lg" href="" target="_blank" role="button">Course Schedule</a>
              <h1 className="lead">{course.schedule}</h1>
            </p>
          </div>
        </div>
        </section>
    </>
  )
}

export default CourseDetails
