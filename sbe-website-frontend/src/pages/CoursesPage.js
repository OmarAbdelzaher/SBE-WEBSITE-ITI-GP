import React from 'react'
import Header from '../components/header'

function CoursesPage() {
  return (
    <>
    <Header/>
    <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12">
              <div className="card rounded-3">
                <img src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg" className="w-100" style={{borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem'}} alt="Sample photo" /> 
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Students Courses</h3>
                </div>
                <div className="card">
        <div className="card-header">
          Course
        </div>
        <div className="card-body">
          <h5 className="card-title">Parallel Programming</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-success">Read More about the course</a>
        </div>
      </div>
      <br></br>
      <div className="card">
        <div className="card-header">
        Course
        </div>
        <div className="card-body">
          <h5 className="card-title">Compiler Design</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-success">Read More about the course</a>
        </div>
      </div>
      <br></br>
      <div className="card">
        <div className="card-header">
        Course
        </div>
        <div className="card-body">
          <h5 className="card-title">Cloud Computing</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-success">Read More about the course</a>
        </div>
      </div>
      <br></br>
      <div className="card">
        <div className="card-header">
        Course
        </div>
        <div className="card-body">
          <h5 className="card-title">SComputer Networks</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-success">Read More about the course</a>
        </div>
      </div>
      <br></br>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CoursesPage
