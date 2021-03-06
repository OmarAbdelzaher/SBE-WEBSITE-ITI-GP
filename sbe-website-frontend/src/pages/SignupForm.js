import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect  , useSelector} from 'react-redux';
import { signup } from '../actions/auth';
import { useState  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";



const Signup = ({ signup, isAuthenticated }) => {
  const errorMessage = useSelector(state => state.auth.data)
  const emailMessage = useSelector(state => state.auth.emailerror)  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "M",
    birthdate: "",
    address: "",
    phone_number: "",
    role: "student",
    password: "",
    confirm_password: "",
    graduate: "graduate",
    year_of_graduation: "2021",
    title: "",
    is_active:false
  });
  const [FormErrors,setFormErrors] = useState({})
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


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const pattern_email = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const pattern_pass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
    );

 


  const validate = (values) =>{
    const errors = {}

    if (!values.fname) {
      errors.fname = "First Name is Required";

    }
    if (!values.lname) {
      errors.lname = "Last Name is Required";
      

    }
    if (!values.email) {
      errors.email = "Email is required !";
      

    } else if (!pattern_email.test(values.email)) {
      errors.email = "Email is invalid !";
    }
    if (!values.password){
      errors.password = "Password is Required"

    }else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 charachters ";

    } else if (!pattern_pass.test(values.password)) {
      errors.password =
        "Password must contains at least one lowercase,one uppercase and one special character ";

    } if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required";

    } else if (values.confirm_password != values.password) {
      errors.confirm_password = "Unmatched Password";

    }
    if (!values.phone_number){
      errors.phone_number = "Phone Number is required";

    } else if (values.phone_number.length != 11 )
    {
      errors.phone_number = "Phone Number must be 11 digits"  
    
    }
    if (!values.address)
    {
      errors.address = " Address is required "
    }
    var now = new Date();
    var birthdate = new Date(values.birthdate)
    if(!values.birthdate)
    {
      errors.birthdate = "BirthDate is required"
    }
    else if(birthdate.getTime() > now.getTime() )
    {
      errors.birthdate = "Enter a valid birth date which is a past date "
    } 
    return errors
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(formData)
    setFormErrors(errors_form)

    if ( Object.keys(errors_form).length === 0  )
    {

      signup(
            fname, lname, email, password, confirm_password ,birthdate,address,phone_number, gender,role, graduate,year_of_graduation,title
          )
    }
    
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (errorMessage != null && errorMessage != "this email is already exist" ) {
    return <Redirect to="/login" />;
    }
  
 
  
  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 form courses-b">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Registration Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}  >
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
                        <p className="text-danger bg-white bg-opacity-75">{ FormErrors.fname }</p>
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
                          <p className="text-danger bg-white bg-opacity-75">{ FormErrors.lname }</p>
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
                          <p className="text-danger bg-white bg-opacity-75">{FormErrors.email}</p>
                          <div>
                          {errorMessage === "this email is already exist" ? <p className="text-danger bg-white bg-opacity-75">{errorMessage}</p> :null}
                          {emailMessage === "person with this email already exists." ? <p className="text-danger bg-white bg-opacity-75">this email is already exist</p> :null}
                          </div>
                        </div>  
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="Password">
                            Password
                          </label>
                          <div className="pass-wrapper">
                          <input
                            type={passwordShown ? "text" : "password"}
                            id="Password"
                            className="form-control form-control-lg"
                            name="password"
                            onChange={(e) => onChange(e)}
                            value={formData.password}
                          />
                          <i className="icon-password" onClick={togglePasswordVisiblity}>{eye}</i>
                          </div>
                          <small className="smallPass fs-6">Password must contain 8 characters, at least A lowercase, An uppercase and A special character</small>
                          <p className="text-danger bg-white bg-opacity-75">{ FormErrors.password}</p>
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
                          <div className="confirm-pass-wrapper">
                          <input
                            type={confirmPasswordShown ? "text" : "password"}
                            id="Confirm-Password"
                            className="form-control form-control-lg"
                            name="confirm_password"
                            onChange={(e) => onChange(e)}
                            value={formData.confirm_password}
                          />
                          <i className="icon-confirm" onClick={toggleConfirmPasswordVisiblity}>{eye}</i>
                          </div>
                          <p className="text-danger bg-white bg-opacity-75">{FormErrors.confirm_password}</p>
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
                          <p className="text-danger bg-white bg-opacity-75">{FormErrors.birthdate}</p>
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
                          <p className="text-danger bg-white bg-opacity-75 ">{FormErrors.phone_number}</p>
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
                          <p className="text-danger bg-white bg-opacity-75">{FormErrors.address}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>
                        <div onChange={(e) => onChange(e)}>
                          <input type="radio" value="M" name="gender" /> Male {" "} <br/>
                          <input type="radio" value="F" name="gender" /> Female
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label" htmlFor="role">Role</label>
                        <br />
                        <select
                          className="select form-control-lg "
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
                            <label htmlFor="graduate">Graduate</label>{" "}
                            <select
                              className="select form-control-lg"
                              value={formData.graduate}
                              onChange={(e) => onChange(e)}
                              name="graduate"
                            >
                              <option value="graduate">Graduate</option>
                              <option value="undergraduate">
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
                            </label> {" "}
                            <input
                              className="rounded border"
                              type="number"
                              name="year_of_graduation"
                              id="yeargrade"
                              onChange={(e) => onChange(e)}
                              value={formData.year_of_graduation}
                            />
                      
                          </div>
                        </div>
                      </>
                    ) : null }
                    {formData.role == "employee" ? (
                      <>
                        <br />
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="title">Title</label> {" "}
                            <input
                            className="border rounded"
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
                    <p className="mt-3 text-light fs-5 ">
                      Already have an account? <Link className="nav-links" to="/login">Sign In</Link>
                    </p>
                    <button
                      type="submit"
                      className="btn button btn-lg mb-1"
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
  isAuthenticated: state.auth.isAuthenticated ,
});

export default connect(mapStateToProps, { signup })(Signup);