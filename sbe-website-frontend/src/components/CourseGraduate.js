import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image/new.jpg";

export default function CourseGraduate() {
  const [graduatecourse, setGraduateCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/coursegraduate/")
      .then((res) => setGraduateCourse(res.data));
  }, []);

  const imgEvent = {
    height: "250px",
  };

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
    // background:'blue',
  };
  const start = {
    // color: 'red',
    // width: '50%',
    // height: '50%',
    marginTop: "150px",
    // background:'blue',
  };

  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row py-2 d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body p-4 p-md-5">
                  <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Graduate Courses
                  </h1>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className=" text-dark col-8">
                   

                    {graduatecourse.map((item) => {
                      return (
                        <>
                        <div className="card cards " key={item.id}>
                      <div className="card-body">
                          <h2 className="card-title"> {item.name}</h2>
                          <p className="card-text fw-bold text-dark">Dr : {item.staff_id}</p>
                          <p className="card-text text-dark">{item.instructions}</p>
                          </div>

                        </div>
                        
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="c-form py-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
