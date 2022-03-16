import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";





export default function CourseForm() {

    const history = useHistory();
  
  
    const [formErrors, setFormErrors] = useState({});
  
    const url = "http://localhost:8000/api/news/";
  
    const [news, setNews] = useState([]);
  
  

    function handle(e) {
        setData({ ...data, [e.target.name]: e.target.value });
      }

    const [changed,setChanged]=useState(false)

    const [data, setData] = useState({
      title: "",
      description:"",
      pic: "",
      category: "",

    });
  
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onChangePicture = e => {
      if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        setChanged(true)
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        console.log(imgData)
        console.log(picture)

        reader.readAsDataURL(e.target.files[0]);
        
      }
    };
  
    const validate = (values) => {
      const errors = {};
  
      if (!values.title) {
        errors.title = "Title is Required";
      }
      if (!values.description) {
        errors.description = "Details is Required";
      }
  
      if (!values.category) {
        errors.category = "Category is required";
      }
  
      return errors;
    };
  
    function onSubmit(e) {
      e.preventDefault();
      let errors_form = validate(data);
      setFormErrors(errors_form);
      // console.log(data)
      if (Object.keys(errors_form).length === 0) {
        const Data = new FormData();

        if(changed==true){

        data.pic=picture
        Data.append("picture", data.pic);
        }
        Data.append("title", data.title);
        Data.append("description", data.description);
        Data.append("category", data.category);

    
  
        axios
          .post(url, Data)
          .then((res) => {
            console.log(res.data);
  
            history.push("/moderator");
          })
          .catch((e) => {
            setFormErrors(e.response.data.non_field_errors[0]);
          });
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
                      Add News Form
                    </h3>
                    <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="title"
                              className="form-label"
                            >
                              Title{" "}
                            </label>
                            <br />
                            <input
                              onChange={(e) => handle(e)}
                              id="title"
                              type="text"
                              className="form-control form-control-lg"
                              name="title"
                              value={data.title}
                            />
                            <p className="text-danger">{formErrors.title}</p>
                          </div>
                        </div>
                      </div>
  
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="description"
                              className="form-label"
                            >
                              Details
                            </label>
                            <br />
                            <input
                              onChange={(e) => handle(e)}
                              id="description"
                              type="text"
                              className="form-control form-control-lg"
                              name="description"
                              value={data.description}
                            />
                            <p className="text-danger">{formErrors.description}</p>
                          </div>
                        </div>
                      </div>
  
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="photo"
                              className="form-label"
                            >
                              Photo
                            </label>
                            <br />
                            <input
                              onChange={(e) => onChangePicture(e)}
                              type="file"
                       
                            />
                       
                          </div>
                        </div>
                      </div>
  
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="category"
                              className="form-label"
                            >
                              Category
                            </label>
                            <br />
  
                            <select
                              id="category"
                              className="select form-control-lg"
                              value={data.category}
                              onChange={(e) => handle(e)}
                              name="category"
                            >
                              <option value="0">Choose Gategory</option>
  
                              <option value="graduate">Graduate</option>
                              <option value="undergraduate">Undergraduate</option>
                            </select>
                            <p className="text-danger">{formErrors.category}</p>
  
               
                          </div>
                        </div>
                      </div> 
  
                      <br />
                      <button type="submit" className="btn button btn-lg mb-1">
                        Submit
                      </button>
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  