import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [student, setStudent] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/student/4`)
      .then((res) => {
        console.log(res.data)
        setStudent(res.data)

      })
  }, []);
  return (
    <section className="h-150 h-custom">
    <div className="container">
      <div className="col">
        <div className="row">
          <div className="col mb-3">
            <div className="card">
              <div className="card-body">
                <div className="e-profile">
                  <div className="row">
                    <div className="col-12 col-sm-auto mb-3">
                      <div className="mx-auto" style={{width: '140px'}}>
                        <div className="d-flex justify-content-center align-items-center rounded" style={{height: '140px', backgroundColor: 'rgb(233, 236, 239)'}}>
                          <span style={{color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial'}}>140x140</span>
                        </div>
                      </div>
                    </div>
                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{student.fname}  {student.lname}</h4>
                        <p className="mb-0">{student.email}</p>
                        <p className="mb-2">{student.graduate}</p>
                        <div className="mt-2">
                          <button className="btn btn-dark" type="button">
                            <i className="fa fa-fw fa-camera" />
                            <span>Change Photo</span>
                          </button>
                          <div className="text-muted"><small>Last login 2 hours ago</small></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <ul className="nav nav-tabs">
                    <li className="nav-item"><a href className="active nav-link">Personal Data</a></li>
                  </ul>
                  <br></br>
                  <div className="tab-content pt-3">
                    <div className="tab-pane active">
                      <form className="form-group-lg" noValidate>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>First Name</label>
                                  <input className="form-control input-lg" type="text" name="" placeholder="First Name" defaultValue="" />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Last Name</label>
                                  <input className="form-control input-lg" type="text" name="" placeholder="Last Name" defaultValue="" />
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Email</label>
                                  <input className="form-control" type="text" placeholder="user@example.com" />
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Phone Number</label>
                                  <input className="form-control" type="number" name="" placeholder="01120796294" defaultValue="" />
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input className="form-control" type="text" placeholder="Nasr city, Cairo" />
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Birthdate</label>
                                  <input className="form-control" type="date" name="" placeholder="" defaultValue="" />
                                </div>
                              </div>
                            </div>
                            <br></br>
                        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <div className="mb-2"><b>Change Password</b></div>
            <div className="row">
              <div className="col">
                <div className="form-group-lg">
                  <label>Current Password</label>
                  <input className="form-control" type="password" placeholder="••••••" />
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>New Password</label>
                  <input className="form-control" type="password" placeholder="••••••" />
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                  <input className="form-control" type="password" placeholder="••••••" /></div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="col-12 col-sm-5 offset-sm-1 mb-3">
            <div className="mb-2"><b>Gender</b></div>
            <div className="row">
                <div className="custom-controls-stacked px-2">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="notifications-blog" defaultChecked />
                    <label className="custom-control-label" htmlFor="notifications-blog">Male</label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id=""/>
                    <label className="custom-control-label">Female</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-dark btn-lg" type="submit">Save Changes</button>
          </div>
        </div>
        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Profile
