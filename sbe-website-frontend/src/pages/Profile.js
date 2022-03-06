import React from 'react'
import { Link } from "react-router-dom";

function CoursesMenu() {
  return (
    <>
    <Header/>
    <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Students Courses</h3>
                  <form className="px-md-2">
                  <div className="row">
                      <div className="col-12">
                      <label className="form-label select-label">Study Year</label>
                        <select className="select form-control-lg">
                        <option value={4}>Preparatory</option>
                          <option value={2}>First Year</option>
                          <option value={3}>Second Year</option>
                          <option value={4}>Third Year</option>
                          <option value={3}>Forth Year</option>
                        </select>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col-12">
                      <label className="form-label select-label">Semester</label>
                        <select className="select form-control-lg">
                          <option value={2}>First Term</option>
                          <option value={3}>Second Term</option>
                        </select>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                    <Link className="nav-links btn-lg mb-1" to="/coursesPage">
                    <button type="submit" className="btn btn-success btn-lg mb-1"> Courses</button>
                    </Link>
                    <br></br>
                    <Link className="nav-links btn-lg mb-1" to="/pdf">
                    <button type="submit" className="btn btn-success btn-lg mb-1"> Schedule</button>
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
