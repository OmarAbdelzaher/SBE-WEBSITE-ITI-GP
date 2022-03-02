import React from "react";
import Header from "../components/header";
import { useState } from "react";
import axios from "axios";

const studentUrl = "http://127.0.0.1:8000/api/students/"
const staffUrl = "http://127.0.0.1:8000/api/staff/"
const FacultyEmpUrl = "http://127.0.0.1:8000/api/facultyemps/"
let url = ""

const SignupForm = () => {
  const [formData,setFormData] = useState({
    'fname':'',
    'lname':'',
    'email':'',
    'gender':'',
    'birthdate':'',
    'address':'',
    'phone_number':'',
    'role':'',
    'password':'',
    'confirm_password':'',
  });

  const handleChange = (event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  // console.log(formData)

  const submitForm = ()=>{
    const userFormData = new FormData();

    userFormData.append("fname", formData.fname)
    userFormData.append("lname", formData.lname)
    userFormData.append("email", formData.email)
    userFormData.append("birthdate", formData.birthdate)
    userFormData.append("address", formData.address)
    userFormData.append("password", formData.password)
    userFormData.append("gender", formData.gender)
    userFormData.append("phone_number", formData.phone_number)

  try{
    if(formData.role == "student"){
      url = studentUrl 
    }
    else if(formData.role == "dr" || formData.role == "ta"){
      url = staffUrl
    }
    else if(formData.role == "employee"){
      url = FacultyEmpUrl
    }
    console.log(url)
    axios.post(url,userFormData).then((response)=>{
      console.log(response.data)
    });
  }
  catch(error){
    console.log(error)
  }
}
  return (
    <>
    <Header/>
      <section
        className="h-150 h-custom"
      >
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
                  <form className="px-md-2">
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="Confirm-Password">
                            Confirm Password
                          </label>
                          <input
                            type="Password"
                            id="Confirm-Password"
                            className="form-control form-control-lg"
                            name="confirm_password"
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>
                        <div onChange={handleChange}>
                          <input type="radio" value="Male" name="gender"/> Male
                          
                          <input type="radio" value="Female" name="gender"/> Female
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label">Role</label><br/>
                        <select className="select form-control-lg" onChange={handleChange} name="role">
                          <option value="student">Student</option>
                          <option value="dr">Dr</option>
                          <option value="ta">TA</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
                    </div>
                    <br/>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                      onClick={submitForm}
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
export default SignupForm;
