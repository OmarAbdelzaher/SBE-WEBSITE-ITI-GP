import React from "react";
const LoginForm = () => {
    return (
        <section className="h-150 h-custom" style={{backgroundColor: '#8fc4b7'}}>
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg" className="w-100" style={{borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem'}} alt="Sample photo" />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Form</h3>
                  <form className="px-md-2">
        <div className="row">
          <div className="col-md-12 mb-4 pb-2">
            <div className="form-outline">
              <input type="email" id="emailAddress" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="emailAddress">Email</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4 pb-2">
            <div className="form-outline">
              <input type="Password" id="Password" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="Password">Password</label>
            </div>
          </div>
        </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Login</button>
                    </form>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </section>
    );
  }
export default LoginForm;