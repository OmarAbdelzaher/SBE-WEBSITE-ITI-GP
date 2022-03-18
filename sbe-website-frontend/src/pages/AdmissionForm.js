import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';

export default function AdmissionForm() {
  const params = useParams();
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const staff = useSelector((state) => state.auth);
  const [isChecked, setIsChecked] = useState(false);
  const [admission, setAdmission] = useState({
    title: "",
    summary: "",
    is_active: "",
    category: params.category,
  });

  if(staff.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (staff.user != null )
  {
    if (staff.user.is_moderator == false && staff.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Admission Title is Required";
    }
    if (!values.summary) {
      errors.summary = "Admission Summary is Required";
    }
    return errors;
  };

  function onSubmit(e) {
    e.preventDefault();
    let errors_form = validate(admission);
    setFormErrors(errors_form);
    if (Object.keys(errors_form).length === 0) {
      const AdmissionData = new FormData();

      AdmissionData.append("title",admission.title)
      AdmissionData.append("summary",admission.summary)
      AdmissionData.append("is_active",isChecked)
      AdmissionData.append("category",params.category)

      axios
        .post("http://localhost:8000/api/admissions/",AdmissionData)
        .then((res) => {
            console.log(res)
            if(params.category == "undergraduate"){
                history.push("/adm-undergraduates")
            }else if(params.category == "graduate"){
                history.push("/adm-graduates")
            }
        })
        .catch((e) => {
            console.log(e)
        });
    }
  } 


  function handle(e) {
      if (e.target.name == "is_active"){
        setIsChecked(!isChecked);
      }
      else{
        setAdmission({ ...admission, [e.target.name]: e.target.value });
      }

  }

  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 courses-b ">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Add Admission
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="title" className="form-label">
                            Title{" "}
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="title"
                            type="text"
                            className="form-control form-control-lg"
                            name="title"
                            value={admission.title}
                          />
                          <p className="text-danger">{formErrors.title}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="summary" className="form-label">
                            Summary
                          </label>
                          <br />
                          <textarea
                            onChange={(e) => handle(e)}
                            id="summary"
                            type="text"
                            className="form-control form-control-lg"
                            name="summary"
                            value={admission.summary}
                          />
                          <p className="text-danger">{formErrors.summary}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div onChange={(e) => handle(e)}>
                        <input
                          type="checkbox"
                          value="active"
                          checked={isChecked}
                          name="is_active"
                        />{" "}
                        Active
                      </div>
                    </div>

                    <button type="submit" className="btn button btn-lg mb-1">
                      Add Admission
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin-b"></div>
      </section>
    </>
  );
}
