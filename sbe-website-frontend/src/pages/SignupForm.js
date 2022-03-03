import React from "react";
import Header from "../components/header";
import { useState , useEffect} from "react";
// import Datetime from 'react-datetime';
// import "react-datetime/css/react-datetime.css"
import ReactDaytime from 'react-daytime';
import axios from "axios";
import { useHistory } from "react-router-dom";


// const localizer = momentLocalizer(moment)
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const studentUrl = "http://localhost:8000/api/students/"
const staffUrl = "http://localhost:8000/api/staff/"
const FacultyEmpUrl = "http://localhost:8000/api/facultyemps/"
let url = ""



const SignupForm = () => {
  let history = useHistory();
  const [formData,setFormData] = useState({
    'fname':'',
    'lname':'',
    'email':'',
    'gender':'M',
    'birthdate':'',
    'address':'',
    'phone_number':'',
    'role':'student',
    'password':'',
    'confirm_password':'',
    'graduate':'graduate',
    'year_of_graduation':'',
    'title':'',
  });
  const [formErrors,setFormErrors] = useState({
    fnameErr: null,
    lnameErr: null,
    emailErr: null,
    addressErr: null,
    birthdateErr: null,
    phone_numberErr: null,
    passwordErr: null,
    ConfirmPasswordErr: null,
    year_of_graduationErr:null,
    titleErr:null,
  })
  // const [isSubmit,setIsSubmit] = useState(false)

  const handleChange = (event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  const pattern_email = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  const pattern_pass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/ )

  // console.log(formData)
  // const validate = (values) =>{
  //   const errors = {};
  //   const pattern_email = new RegExp(
  //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  //   );
  //   const pattern_pass = new RegExp(
  //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])" )
  //   if (!values.fname)
  //   {
  //     errors.fname = "First Name is Required ! "
  //   }
  //   if (!values.lname)
  //   {
  //     errors.lname = "Last Name is Required ! "
  //   }
  //   if (!values.email)
  //   {
  //     errors.email = "Email is Required ! "
  //   }else if (!pattern_email.test(values.email)) {
  //     errors.email = "Email is invalid !";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required ";
  //   } else if (values.password.length < 8) {
  //     errors.password = "Password must be more than 8 charachters ";
  //   } else if (!pattern_pass.test(values.password)) {
  //     errors.password =
  //       "Password must contains at least one lowercase,one uppercase and one special character ";
  //   }
  //   if (!values.confirm_password) {
  //     errors.confirm_password = "Confirm Password is required";
  //   } else if (values.confirm_password !=  values.password) {
  //     errors.confirm_password = "Unmatched Password";
  //   }
  //   if (!values.phone_number){
  //     errors.phone_number = "Phone Number is required";
  //   } else if (values.phone_number.length != 11 )
  //   {
  //     errors.phone_number = "Phone Number must be 11 digits"
  //   }
  //   if (!values.address)
  //   {
  //     errors.address = " Address is required "
  //   }
  //   var now = new Date();
  //   var birthdate = new Date(values.birthdate)
  //   if(!values.birthdate)
  //   {
  //     errors.birthdate = "BirthDate is required"

  //   }
  //   else if(birthdate.getTime() > now.getTime() )
  //   {
  //     errors.birthdate = "Enter a valid birth date which is a past date "
      
  //   } 
    // else if (values.birthdate > today_date )
    // {
    //   errors.birthdate = "BirthDate must be in the past !"
    // }
    
    // if (!values.year_of_graduation)
    // {
    //   errors.year_of_graduation = " Year Of Graduation is required "
    // }
    // if (!values.title)
    // {
    //   errors.title = " Title is required "
    // }
    
    // return errors
  // }



  // useEffect(()=>{
  //   if(Object.keys(formErrors).length === 0 && isSubmit)
  //   {
  //     console.log(formData)
  //   }

  // },[formErrors])

  const submitForm = (e)=>{
    e.preventDefault();
    // console.log(formData)
    // setFormErrors(validate(formData))
    // console.log(setFormErrors(validate(formData)))
    // console.log(formErrors)
    // console.log(Object.keys(formErrors).length)
    // if (Object.keys(formErrors).length != 0)
    // {
    //   return false 
    // }
      
    const userFormData = new FormData();
    userFormData.append("fname", formData.fname)
    userFormData.append("lname", formData.lname)
    userFormData.append("email", formData.email)
    userFormData.append("birthdate", formData.birthdate)
    userFormData.append("address", formData.address)
    userFormData.append("password", formData.password)
    userFormData.append("gender", formData.gender)
    userFormData.append("phone_number", formData.phone_number)

    if (formData.role == "student")
    {
      userFormData.append("graduate",formData.graduate)
      userFormData.append("year_of_graduation",formData.year_of_graduation)
    }
    else if (formData.role == "dr" || formData.role == "ta")
    {
      userFormData.append("office_hours",formData.office_hours)
    }
    else if (formData.role == "employee")
    {
      userFormData.append("title",formData.title)
    }

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
    
    axios.post(url,userFormData,
    
    ).then((response)=>{
      console.log(response.data)
      // history.push('/')
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
                            value = {formData.fname}
                          />
                          <p className="text-danger">{formErrors.fname}</p>
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
                            value = {formData.lname}
                          />
                          <p className="text-danger">{formErrors.lname}</p>
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
                            value = {formData.email}
                          />
                          <p className="text-danger">{formErrors.email}</p>
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
                            value = {formData.password}

                          />
                          <p className="text-danger">{formErrors.password}</p>
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
                            value = {formData.confirm_password}

                          />
                          <p className="text-danger">{formErrors.confirm_password}</p>
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
                            value = {formData.birthdate}

                          />
                          <p className="text-danger">{formErrors.birthdate}</p>
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
                            value = {formData.phone_number}
                          />
                          <p className="text-danger">{formErrors.phone_number}</p>
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
                            value = {formData.address}
                            

                          />
                          <p className="text-danger">{formErrors.address}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div onChange={handleChange}>
                          <input type="radio" value="M" name="gender"/> Male
                          
                          <input type="radio" value="F" name="gender"/> Female
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label">Role</label><br/>
                        <select className="select form-control-lg" value={formData.role} onChange={handleChange} name="role">
                          <option value="student">Student</option>
                          <option value="dr">Dr</option>
                          <option value="ta">TA</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
                    </div>
                    { formData.role === 'student' ?
                   <>
                   <br/>
                    <div className="row">
                    <div className="col-12">
                       <label htmlFor="graduate">Graduate</label>
                       <select className="select form-control-lg" value ={formData.graduate} onChange={handleChange} name="graduate">
                        <option value="gradstd">Graduate</option>
                        <option value="undergradstd">Undergraduate</option>
                       </select>
                      </div>
                      </div>
                    <br/>
                    <div className="row">
                    <div className="col-12">
                      <label htmlFor="yeargrade">Year Of Graduation</label>
                        <input type="number"
                            name="year_of_graduation"
                            id = "yeargrade"
                            onChange={handleChange}
                        />
                        <p className="text-danger">{formErrors.year_of_graduation}</p>
                      </div>
                      </div>
                   </>
                   : null
                    } 
                    { formData.role == 'employee' ?
                   <>
                   <br/>
                   <div className="row">
                    <div className="col-12">
                       <label htmlFor="title">Title</label>
                       <input type="text"
                           name="title"
                           onChange={handleChange}
                       />
                       <p className="text-danger">{formErrors.title}</p>
                      </div>
                      </div>
                   </>
                   : null
               } 
                { formData.role == 'dr' || formData.role == 'ta' ?
                   <>
                   <br/>
                   <div className="row">
                    <div className="col-12">
                       <label >Office Hours</label>
                       <ReactDaytime name='office_hours' onChange={handleChange}  value = {formData.office_hours} />
                      </div>
                      </div>
                   </>
                   : null
               } 

                    <br/>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                      onClick={submitForm}
                      disabled={
                        formErrors.fname ||
                        formErrors.lname ||
                        formErrors.email ||
                        formErrors.password ||
                        formErrors.confirm_password ||
                        formErrors.address ||
                        formErrors.phone_number ||
                        formErrors.birthdate
                        }
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
