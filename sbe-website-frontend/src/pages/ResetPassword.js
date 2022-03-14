import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import { useState} from "react";
import {useSelector } from "react-redux";

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    const [FormErrors,setFormErrors] = useState({})
  const {
    email,
  } = formData;

  const pattern_email = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

    const validate = (values) =>{
      const errors = {}
      if (!values.email) {
        errors.email = "Email is required !";
  
      } else if (!pattern_email.test(values.email)) {
        errors.email = "Email is invalid !";
        
      }
      return errors
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        let errors_form = validate(formData)
        console.log(errors_form)
        setFormErrors(errors_form)
        if ( Object.keys(errors_form).length === 0  ){
        reset_password(email);
        setRequestSent(true);
        }
    };

    if (requestSent) {
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
                    Request Password Reset
                  </h3>
                  <form className="px-md-2" onSubmit={e => onSubmit(e)} >
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                          <input
                            className='form-control form-control-lg'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                          />
                        </div>
                        <p className="text-danger">{ FormErrors.email }</p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn button btn-lg mb-1"
                    >
                      Reset Password 
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>

        // <div className='container mt-5'>
        //     <h1>Request Password Reset:</h1>
        //     <form onSubmit={e => onSubmit(e)}>
        //         <div className='form-group'>
        //             <input
                        // className='form-control'
                        // type='email'
                        // placeholder='Email'
                        // name='email'
                        // value={email}
                        // onChange={e => onChange(e)}
                        // required
        //             />
        //         </div>
        //         <br/>
        //         <br/>
        //         <button className='btn btn-primary' type='submit'>Reset Password</button>
        //     </form>
        // </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);