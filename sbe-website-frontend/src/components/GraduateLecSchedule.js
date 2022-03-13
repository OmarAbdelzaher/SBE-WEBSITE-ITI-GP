import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'

function GraduateLecSchedule() {
  return (
    <>
 <section className="h-custom py-5">
        <div className="container ">
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light'>
              <div className='margin'>
                <div className='card-body justify-content-center'>
                <p className=' text-center'>Lectures Schedule</p>
                </div>
                <div>
                <table className="table table-bordered border-primary bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>Section</th>
                      <th>Download</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    <tr>
                      <td>
                        <Link className="admin-tables" to="#">Master</Link>
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
      </section>    </>
  )
}

export default GraduateLecSchedule
