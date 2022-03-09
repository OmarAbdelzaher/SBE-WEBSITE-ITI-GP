import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from "react-bootstrap/NavDropdown";


function UnderGraduateExams() {
  return (
  <>
 <section className="h-custom py-5">
        <div className="container ">
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light'>
              <div className=''>
                <div className='card-body '>
                <p className='fs-2'>Exams Schedule</p>
                </div>
                <div>
                <table className="table table-bordered border-primary bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>Year</th>
                      <th>Download</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    <tr>
                      <td>
                        <Link className="admin-tables">1 </Link>
                      </td>
                      <td>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faDownload}
                            />{" "}
                            Download
                          </button>
                        </Link>
                        <Link>
                          <button className="btn button">
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faUpload}
                            />{" "}
                            Upload
                          </button>
                        </Link>
                     
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>  
      
      </>
  )
}

export default UnderGraduateExams
