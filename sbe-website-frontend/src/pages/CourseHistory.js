import React from 'react'


const CourseHistory = () => {
    // const [courses, setCourses] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/course/${params.id}`)
    //         .then((res) => {
    //             setCourses(res.data)
    //         })
    // }, []);
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
                                        <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2>
                                            <h3 className='col-12'>Doctor Name</h3>
                                            <p className="col-4">Download Materials</p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                                {/* <a className="button nav-links text-light" href={course.history} download>Download</a> */}
                                            </button>

                                            {/* <h2 className="bg-light py-3 nav-links">Course History</h2>
                                            <p className="fs-4">{course.history}</p> */}
                                        </div>


                                        <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2>
                                            <h3 className='col-12'>Doctor Name</h3>
                                            <p className="col-4">Download Materials</p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                                {/* <a className="button nav-links text-light" href={course.history} download>Download</a> */}
                                            </button>

                                            {/* <h2 className="bg-light py-3 nav-links">Course History</h2>
                                            <p className="fs-4">{course.history}</p> */}
                                        </div>

                                        <div className="row justify-content-center align-items-center ">
                                            <h2 className="bg-light py-3 nav-links">Year</h2>
                                            <h3 className='col-12'>Doctor Name</h3>
                                            <p className="col-4">Download Materials</p>
                                            <button className="btn btn-lg col-6 button">
                                                Download
                                                {/* <a className="button nav-links text-light" href={course.history} download>Download</a> */}
                                            </button>

                                            {/* <h2 className="bg-light py-3 nav-links">Course History</h2>
                                            <p className="fs-4">{course.history}</p> */}
                                        </div>




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
