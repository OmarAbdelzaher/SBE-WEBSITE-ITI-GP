import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect , useSelector } from "react-redux";
import { login } from "../actions/auth"

function LoginForm({login , isAuthenticated}) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [FormErrors,setFormErrors] = useState({})
  const {
    email,
    password
  } = formData;

  const errorMessage = useSelector(state => state.auth.error)
  const emailMessage = useSelector(state => state.auth.emailerror) 

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) =>{
    const errors = {}
    if (!values.email) {
      errors.email = "Email is required !";

    } else if (!pattern_email.test(values.email)) {
      errors.email = "Email is invalid !";
      
    }
    if (!values.password){
      errors.password = "Password is Required"       
    } 
    return errors
  }
  
    const onSubmit = e => {
        e.preventDefault();
        let errors_form = validate(formData)
        setFormErrors(errors_form)
        if ( Object.keys(errors_form).length === 0  ){
        login(email, password);
        }
    };

    const pattern_email = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

  


  if (isAuthenticated) {
    return <Redirect to='/' />
}
  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 courses-b form">
                {/* <img
                  src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                /> */}
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Login Form
                  </h3>
                  <form className="px-md-2" onSubmit={e => onSubmit(e)}>
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
                            onChange={e => onChange(e)}
                            value={email}
                            name="email"
                          />
                        </div>
                        <p className="text-danger">{ FormErrors.email }</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="Password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="Password"
                            name="password"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                            value={password}
                          />
                        </div>
                        <p className="text-danger">{ FormErrors.password }</p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn button btn-lg mb-1"
                    >
                      Login
                    </button>
                    <div>
                    {errorMessage === "No active account found with the given credentials" ? <p className="text-danger">No active account found with this email</p> :null}
                    </div>
                  </form>
                  <p className="mt-3 text-light fs-5 ">
                    Don't have an account? <Link className="nav-links" to="/signup">Sign Up</Link>
                  </p>
                  <p className="mt-3 text-light fs-5 ">
                    Forgot your Password?{" "}
                    <Link className="nav-links" to="/reset-password">Reset Password</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="margin-b"></div>

          </div>
        </div>
      </section>
    </>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginForm);
