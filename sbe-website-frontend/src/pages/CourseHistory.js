import React from 'react'
import {  Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

const CourseHistory = () => {

    const [courses, setCourses] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/coursehistory/${params.course_id}`)
            .then((res) => {
                setCourses(res.data)
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
                                    <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 bg-light rounded text-center nav-links border border-dark">History of "Course-Name"</h1>
                                </div>
                                {/* {courses.map((course) => {
                                    return ( */}
                                    {/* {courses.map((item) => {
                        return (<> */}
                        
                                        <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2> <p>{courses.year}</p>
                                            <h3 className='col-12'>Doctor Name {courses.staff_id}</h3> 
                                            <p className="col-4">Download Materials {courses.material} </p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                            </button>

                                        </div>
                                        {/* </>
                                    )})} */}

                                        {/* <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2>
                                            <h3 className='col-12'>Doctor Name</h3>
                                            <p className="col-4">Download Materials</p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                            </button>

                                        </div> */}

                       




                                    {/* );
                                })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>





        </>
    )
}

export default CourseHistory
