import React from 'react'
import { Link } from 'react-router-dom'

function CoursesMenu() {
  return (
    <>
    <section className="h-150 h-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-8 col-xl-6">
              <div className=" rounded-3 form">
                <div className=" p-4 p-md-5 courses-b border border-2 border-light" >
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 ">Students Courses</h3>
                  <form className="px-md-2">
                  <div className="row">
                      <div className="col-12">
                      <label className="form-label select-label col-12 fs-5 ">Study Year</label>{" "}
                        <select className="select form-control-lg col-12 ">
                          <option  value={2}>First Year</option>
                          <option  value={3}>Second Year</option>
                          <option  value={4}>Third Year</option>
                          <option  value={3}>Forth Year</option>
                        </select>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-12">
                      <label className="form-label select-label col-12 fs-5">Semester</label>
                        <select className="select form-control-lg col-12">
                          <option value={2}>First Term</option>
                          <option value={3}>Second Term</option>
                        </select>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <Link className='button btn btn-lg col-12' to="/coursesPage">
                    <button type="submit" className="button ani  mb-1">Show Courses</button>
                    </Link>
                    <Link className='button btn btn-lg col-12' >
                    <button type="submit" className="button ani mb-1">Show Schedule</button>
                    </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CoursesMenu
