import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
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
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Password Reset
                  </h3>
                  <form className="px-md-2" onSubmit={e => onSubmit(e)} >
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                          New Password
                          </label>
                          <input
                            className='form-control form-control-lg'
                            type='password'
                            placeholder='New Password'
                            name='new_password'
                            value={new_password}
                            onChange={e => onChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                          Confirm New Password
                          </label>
                          <input
                            className='form-control form-control-lg'
                            type='password'
                            placeholder='Confirm New Password'
                            name='re_new_password'
                            value={re_new_password}
                            onChange={e => onChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn button btn-lg mb-1"
                    >
                      Save
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
