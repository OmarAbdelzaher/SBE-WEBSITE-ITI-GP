import React from 'react'
import Header from '../components/header'

function CourseDetails() {
  return (
    <>
    <Header/>
    <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg" className="w-100" style={{borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem'}} alt="Sample photo" />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Courses Details</h3>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CourseDetails
