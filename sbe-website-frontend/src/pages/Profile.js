import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile(isAuthenticated) {
  const who = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    address:"",
    birthdate:"",
    phone_number:"",
    password:"",

    graduate:"",
    year_of_graduation:"",
    
    title:"",

    role:""
  });
  
  let StudentUrl = "http://localhost:8000/api/student/14"
  let StaffUrl = "http://localhost:8000/api/onestaff/14"
  let EmpUrl = "http://localhost:8000/api/facultyemp/14"

  useEffect(() => {
    setUser(who.user)
  }, []);
 
  // useEffect(() => {
  //   axios
  //     .get(StudentUrl)
  //     .then((res) => {
  //       console.log(res.data);
  //       setUser(res.data)});
  // }, []);


  const onChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      console.log(user);

      const Data = new FormData();
      Data.append('fname',user.fname)
      Data.append('lname',user.lname)
      Data.append('email',user.email)
      Data.append('address',user.address)
      Data.append('gender',user.gender)
      Data.append('graduate',user.graduate)
      Data.append('birthdate',user.birthdate)
      Data.append('phone_number',user.phone_number)
      Data.append('password',user.password)
      Data.append('year_of_graduation',user.year_of_graduation)

      axios.put(StudentUrl,Data)
    }


 
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
                        <div className="text-muted"><small>Last login 2 hours ago</small></div>
                      </div>
                    </div>
                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{user.fname}  {user.lname}</h4>
                        <p className="mb-0">{user.email}</p>
                        <p className="mb-2">{user.graduate}</p>
                        <div className="mt-2">
                          <button className="btn btn-dark" type="button">
                            <i className="fa fa-fw fa-camera" />
                            <span>Change Photo</span>
                          </button>
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
                      <form className="form-group-lg" onSubmit={(e) => onSubmit(e)} noValidate>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>First Name</label>
                                  <input className="form-control input-lg" type="text" name="fname" placeholder="First Name" value={user.fname} onChange={(e) => onChange(e)} />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Last Name</label>
                                  <input className="form-control input-lg" type="text" name="lname" placeholder="Last Name" value={user.lname} onChange={(e) => onChange(e)}/>
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Email</label>
                                  <input className="form-control" type="text" name="email" placeholder="user@example.com" value={user.email} onChange={(e) => onChange(e)}/>
                                </div>
                              </div>
                            </div>
                            <br></br>

                            <div className="col-md-6 mb-4">
                              <h6 className="mb-2 pb-1">Gender: </h6>
                              <div onChange={(e) => onChange(e)}>
                                <input type="radio" value="M" name="gender" checked={user.gender==="M"}/> Male
                                <input type="radio" value="F" name="gender" checked={user.gender==="F"}/> Female
                              </div>
                            </div>

                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Phone Number</label>
                                  <input className="form-control" type="number" name="phone_number" placeholder="01120796294" value={user.phone_number} onChange={(e) => onChange(e)}/>
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input className="form-control" type="text" name="address" placeholder="Nasr city, Cairo" value={user.address} onChange={(e) => onChange(e)} />
                                </div>
                              </div>
                            </div>
                            <br></br>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Birthdate</label>
                                  <input className="form-control" type="date" name="birthdate" placeholder="" value={user.birthdate} onChange={(e) => onChange(e)}/>
                                </div>
                              </div>
                            </div>
                            <br></br>
                        <div className="row">
          {/* <div className="col-12 col-sm-6 mb-3">
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
          </div> */}
          <br></br>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-dark btn-lg" type="submit" >Save Changes</button>
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
