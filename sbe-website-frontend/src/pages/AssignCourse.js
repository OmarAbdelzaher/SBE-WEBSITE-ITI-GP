import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Select, { components } from "react-select";
import Select from "react-select";

export default function AssignCourse() {
  const history = useHistory();

  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);

  const url = "http://localhost:8000/api/courses/";

  const [course, setCourse] = useState([]);

  let CoursesUrl = "http://localhost:8000/api/courses/";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/")
      .then((res) => setCourse(res.data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      // .then((res) => setDoctors(res.data));

      .then((res) => setDoctors(res.data));

    //   function (res) {
    //   let options = res.data.map( doctor => ({ value: doctor.id, label: doctor.fname}));
    //   setDoctors (options)
    //   console.log(options)
    // })
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/")
      .then((res) => setCourse(res.data));
  }, []);

  const [data, setData] = useState({
    coursename: "",
    staff: "",

  });

  const validate = (values) => {
    const errors = {};

    if (!values.coursename) {
      errors.coursename = "Course Name is Required";
    }
    if (!values.staff) {
      errors.staff = "Staff Name is Required";
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

    //   Data.append("name", data.name);
    
    //   Data.append("staff_id", data.staff);

    
      axios
        .put(url, Data)
        .then((res) => {
          console.log(res.data);

          history.push("/coursesMenu");
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
    
    }
  }

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data)

    // const newdata = { ...data };
    // newdata[e.target.name] = e.target.value;
    // setData(newdata);
    // console.log(newdata);
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
                    Assign Course
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>


                  <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                             Choose Course Name
                          </label>
                          <br />

                          <select
                            id="coursename"
                            className="select form-control-lg"
                            value={data.coursename}
                            onChange={(e) => handle(e)}
                            name="coursename"
                          >
                            <option selected value="0">Choose Course</option>

                                  {course.map((item) => {
                                    return (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                          </select>
                          <p className="text-danger">{formErrors.coursename}</p>

                         
                        </div>
                      </div>
                    </div>

                    

                   
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Staff Name
                          </label>
                          <br />

                          <select
                            id="multiselect staff"
                            multiple="multiple"
                            className="select form-control-lg"
                            value={data.staff}
                            onChange={(e) => handle(e)}
                            name="staff"
                          >
                            {/* 

                            {/* <option selected value="0">
                              Available Staff
                            </option> */}
                            {doctors.map((doctor) => {
                              return (
                                <option value={doctor.id}>
                                  {doctor.fname} {doctor.lname}
                                </option>
                              );
                            })}

                          </select>
                          <br />
                          <p className="text-danger">{formErrors.staff}</p>
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
