import React from 'react'
import { useSelector } from "react-redux";
import {useHistory,useParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

export default function EditLabForm() {
    const params = useParams();
    let Url = `http://localhost:8000/api/lab/${params.id}`;
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({});
    const [LabErrors, setLabErrors] = useState({});
    const moderator = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
      name: params.name,
    });


    useEffect(() => {
        axios
            .get(Url)
            .then((res) => {setFormData(res.data)
            });
    }, []);
    if(moderator.user == null)
    {
      return <Redirect to="/" />;  
    }
    if (moderator.user != null )
    {
      if (moderator.user.role == false && moderator.user.is_admin == false )
      {
        return <Redirect to="/" />;  
      }
    }

  
    const onChange = (e) =>
      setFormData({[e.target.name]: e.target.value });
  
  
      const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        return errors;
      };
  
      const onSubmit = (e) => {
        e.preventDefault();
        let errors_form = validate(formData);
        setFormErrors(validate(formData));
    
        if (Object.keys(errors_form).length === 0) {
          const Data = new FormData();
          Data.append("name", formData.name);
          axios
            .put(Url, Data)
            .then((res) => {
              history.push("/labs");
            })
            .catch((e) => {
              setLabErrors(e.response.data.name[0]);
            });
        }
      };



  return (
    <>
        <section style={{height:"100vh"}}>

    <section className=" h-custom">
      <div className="container py-5 h-150">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3 courses-b ">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Edit Lab Form
                </h3>
                <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                  <div className="row">
                    <div className="col-md-12 mb-4 d-flex align-items-center">
                      <div className="form-outline datepi+cker w-100">
                        <label htmlFor="lab" className="form-label">
                          Lab Name
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="lab"
                          name="name"
                          value={formData.name}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn button btn-lg mb-1">
                    Submit
                  </button>
                  {formErrors.name ?<div class="alert alert-danger" role="alert">
                      Name is required
                    </div> : null }
                  {LabErrors == "lab with this name already exists."? (
                    <div class="alert alert-danger" role="alert">
                      Lab with this name already exists.
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </section>
  </>
    
  )
}
