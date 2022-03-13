import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function AssignCourse() {
  const params = useParams();
  let url = `http://localhost:8000/api/course/${params.id}`;

  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);

  const [data, setData] = useState({
    name: "",
    total_grade: "",
    instructions: "",
    materials: "",
    year: "",
    semester: "",
    staff_id: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/course/${params.id}`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      .then((res) => setDoctors(res.data));
  }, []);

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validate = (values) => {
    const errors = {};
    if (!values.staff_id) {
      errors.staff_id = "Staff Name is Required";
    }

    return errors;
  };


  function onSubmit(e) {
    e.preventDefault();
    let errors_form = validate(data);

    setFormErrors(errors_form);
    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();

      Data.append("name", data.name);
      Data.append("staff_id", data.staff_id);
      Data.append("total_grade", data.total_grade);
      Data.append("instructions", data.instructions);
      Data.append("materials", data.materials);
      Data.append("year", data.year);
      Data.append("semester", data.semester);
      Data.append("category", data.category);

      axios
        .put(url, Data)
        .then((res) => {
          history.push("/coursesMenu");
        })
        .catch((e) => console.log(e));
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
                            Course Name
                          </label>
                          <h4>{data.name}</h4>
                          <br />
                          <p className="text-danger">{formErrors.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="staff" className="form-label">
                            Staff Name
                          </label>
                          <br />
                          <select
                            multiple
                            id="staff"
                            className="select form-control-lg"
                            value={data.staff_id}
                            onChange={(e) => handle(e)}
                            name="staff_id"
                          >
                            {doctors.map((doctor) => {
                              return (
                                <option value={doctor.id}>
                                  {doctor.fname} {doctor.lname}
                                </option>
                              );
                            })}
                          </select>
                          <br />
                          <p className="text-danger">{formErrors.staff_id}</p>
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
