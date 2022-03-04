import React from "react";
import Header from "../components/header";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { useState, useEffect } from "react";
import axios from "axios";

// const studentUrl = "http://localhost:8000/api/students/"
// const staffUrl = "http://localhost:8000/api/staff/"
// const FacultyEmpUrl = "http://localhost:8000/api/facultyemps/"
// let url = ""

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    birthdate: "",
    address: "",
    phone_number: "",
    role: "student",
    password: "",
    confirm_password: "",
    graduate: "graduate",
    year_of_graduation: "",
    title: "",
  });
  // const [formErrors,setFormErrors] = useState({})
  // const [isSubmit,setIsSubmit] = useState(false)
  const {
    fname,
    lname,
    email,
    password,
    confirm_password,
    gender,
    birthdate,
    address,
    role,
    phone_number,
    graduate,
    year_of_graduation,
    title,
  } = formData;

  // const handleChange = (event)=>{
  //   setFormData({
  //     ...formData,
  //     [event.target.name]:event.target.value
  //   })
  // }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === confirm_password) {
      signup(
        fname,
        lname,
        email,
        password,
        confirm_password,
        gender,
        birthdate,
        address,
        role,
        phone_number,
        graduate,
        year_of_graduation,
        title
      );
      setAccountCreated(true);
    }
  };

  // const submitForm = (e)=>{
  //   e.preventDefault();
  //   console.log(formData)
  //   setFormErrors(validate(formData))
  //   console.log(setFormErrors(validate(formData)))
  //   console.log(formErrors)
  //   console.log(Object.keys(formErrors).length)
  //   if (Object.keys(formErrors).length != 0)
  //   {
  //     return false
  //   }

  //   const userFormData = new FormData();
  //   userFormData.append("fname", formData.fname)
  //   userFormData.append("lname", formData.lname)
  //   userFormData.append("email", formData.email)
  //   userFormData.append("birthdate", formData.birthdate)
  //   userFormData.append("address", formData.address)
  //   userFormData.append("password", formData.password)
  //   userFormData.append("gender", formData.gender)
  //   userFormData.append("phone_number", formData.phone_number)
  //   if (formData.role == "student")
  //   {
  //     userFormData.append("graduate",formData.graduate)
  //     userFormData.append("year_of_graduation",formData.year_of_graduation)
  //   }
  //   // else if (formData.role == "dr" || formData.role == "ta")
  //   // {
  //   //   userFormData.append("office_hours",formData.office_hours)
  //   // }
  //   else if (formData.role == "employee")
  //   {
  //     userFormData.append("title",formData.title)
  //   }

  // try{
  //   if(formData.role == "student"){
  //     url = studentUrl
  //   }
  //   else if(formData.role == "dr" || formData.role == "ta"){
  //     url = staffUrl
  //   }
  //   else if(formData.role == "employee"){
  //     url = FacultyEmpUrl
  //   }
  //   console.log(url)

  //   axios.post(url,userFormData,

  //   ).then((response)=>{
  //     console.log(response.data)
  //   });
  // }
  // catch(error){
  //   console.log(error)
  // }
  // }
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Registration Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                            name="fname"
                            onChange={(e) => onChange(e)}
                            value={formData.fname}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-lg"
                            name="lname"
                            onChange={(e) => onChange(e)}
                            value={formData.lname}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                          <input
                            type="email"
                            id="emailAddress"
                            className="form-control form-control-lg"
                            name="email"
                            onChange={(e) => onChange(e)}
                            value={formData.email}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="Password">
                            Password
                          </label>
                          <input
                            type="Password"
                            id="Password"
                            className="form-control form-control-lg"
                            name="password"
                            onChange={(e) => onChange(e)}
                            value={formData.password}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor="Confirm-Password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="Password"
                            id="Confirm-Password"
                            className="form-control form-control-lg"
                            name="confirm_password"
                            onChange={(e) => onChange(e)}
                            value={formData.confirm_password}
                          />
                          
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="birthdayDate" className="form-label">
                            Birthdate
                          </label>
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                            name="birthdate"
                            onChange={(e) => onChange(e)}
                            value={formData.birthdate}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            className="form-control form-control-lg"
                            name="phone_number"
                            onChange={(e) => onChange(e)}
                            value={formData.phone_number}
                          />
    
                        </div>
                      </div>
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="address">
                            Address
                          </label>
                          <input
                            type="tel"
                            id="address"
                            className="form-control form-control-lg"
                            name="address"
                            onChange={(e) => onChange(e)}
                            value={formData.address}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>
                        <div onChange={(e) => onChange(e)}>
                          <input type="radio" value="M" name="gender" /> Male
                          <input type="radio" value="F" name="gender" /> Female
                        </div>
                        {/* <select className="select form-control-lg" value={formData.gender} onChange={handleChange}  name="gender">
                          <option value="M">Male</option>
                          <option value="F">Female</option>  
                        </select> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label">Role</label>
                        <br />
                        <select
                          className="select form-control-lg"
                          value={formData.role}
                          onChange={(e) => onChange(e)}
                          name="role"
                        >
                          <option value="student">Student</option>
                          <option value="dr">Dr</option>
                          <option value="ta">TA</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
                    </div>
                    {formData.role === "student" ? (
                      <>
                        <br />
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="graduate">Graduate</label>
                            <select
                              className="select form-control-lg"
                              value={formData.graduate}
                              onChange={(e) => onChange(e)}
                              name="graduate"
                            >
                              <option value="gradstd">Graduate</option>
                              <option value="undergradstd">
                                Undergraduate
                              </option>
                            </select>
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="yeargrade">
                              Year Of Graduation
                            </label>
                            <input
                              type="number"
                              name="year_of_graduation"
                              id="yeargrade"
                              onChange={(e) => onChange(e)}
                              value={formData.year_of_graduation}
                            />
                      
                          </div>
                        </div>
                      </>
                    ) : null}
                    {formData.role == "employee" ? (
                      <>
                        <br />
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              name="title"
                              onChange={(e) => onChange(e)}
                              value={formData.title}
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {formData.role == "dr" || formData.role == "ta" ? (
                      <>
                        <br />
                        <div className="row">
                          <div className="col-12">
                            {/* <label >Office Hours</label> */}
                            {/* <ReactDaytime name='office_hours' onChange={handleChange}  value = {formData.office_hours} /> */}
                          </div>
                        </div>
                      </>
                    ) : null}

                    <br />
                    <p className="mt-3">
                      Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                      // onClick={submitForm}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
// export default SignupForm;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
