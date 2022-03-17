import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// select-react import
import Select from "react-select";
import makeAnimated from "react-select/animated";

let listing = [];
let concatlist = [];

export default function CourseForm() {
  const params = useParams();
  const history = useHistory();
  const animatedComponents = makeAnimated();

  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);

  const url = "http://localhost:8000/api/courses/";

  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/")
      .then((res) => setCourse(res.data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      .then((res) => setDoctors(res.data));
  }, []);

  const nameoptions = [];
  const taoptions = [];
  doctors.map((tag) => {
    if (tag.role == "dr") {
      nameoptions.push({ value: tag.id, label: `${tag.fname} ${tag.lname}` });
    } else {
      taoptions.push({ value: tag.id, label: `${tag.fname} ${tag.lname}` });
    }
  });
  const changeSelectedNames = (e) => {
    console.log(Object.values(e));

    let List_names = Object.values(e);
    let chosen = [];
    for (let t of List_names) {
      chosen.push(parseInt(t.value));
    }
    listing = chosen;
    setData({
      ...data,
      staff: chosen,
    });
  };

  const changeSelected = (e) => {
    console.log(Object.values(e));

    let List_names = Object.values(e);
    let tachoose = [];
    for (let t of List_names) {
      tachoose.push(parseInt(t.value));
    }
    concatlist = listing.concat(tachoose);
    console.log(concatlist);
    setData({
      ...data,
      staff: concatlist,
    });
  };

  const [data, setData] = useState({
    name: "",
    stdgrades: "",
    totalgrade: "",
    instructions: "",
    materials: "",
    year: "",
    semester: "",
    staff: "",
    category: params.category,
  });

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Course Name is Required";
    }
    if (!values.totalgrade) {
      errors.totalgrade = "Total Grade is Required";
    }
    if (!values.instructions) {
      errors.instructions = "Instructions is required !";
    }

    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.staff) {
      errors.staff = "Doctor Name is required!";
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
      Data.append("total_grade", data.totalgrade);
      data.staff.forEach((element) => {
        console.log(element);
        Data.append("staff_id", element);
      });

      Data.append("instructions", data.instructions);
      Data.append("materials", data.materials);
      Data.append("year", data.year);
      Data.append("semester", data.semester);
      Data.append("category", params.category);

      axios
        .post(url, Data)
        .then((res) => {
          if (params.category == "graduate") {
            history.push("/coursegraduate");
          } else if (params.category == "undergraduate") {
            history.push("/coursesMenu");
          }
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
    }
  }

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
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
                    Add Course Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="name" className="form-label">
                            Name{" "}
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="name"
                            type="text"
                            className="form-control form-control-lg"
                            name="name"
                            value={data.name}
                          />
                          <p className="text-danger">{formErrors.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="totalgrade" className="form-label">
                            Total grade
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="totalgrade"
                            type="number"
                            className="form-control form-control-lg"
                            name="totalgrade"
                            value={data.totalgrade}
                          />
                          <p className="text-danger">{formErrors.totalgrade}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="instructions" className="form-label">
                            Instructions
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="instructions"
                            type="text"
                            className="form-control form-control-lg"
                            name="instructions"
                            value={data.instructions}
                          />
                          <p className="text-danger">
                            {formErrors.instructions}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="materials" className="form-label">
                            Material Link (optional){" "}
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="materials"
                            type="text"
                            className="form-control form-control-lg"
                            name="materials"
                            value={data.materials}
                          />
                          <p className="text-danger">{formErrors.materials}</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="staff" className="form-label">
                            Doctors Name
                          </label>
                          <br />

                          <Select
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder={"Choose Doctor Names"}
                            isMulti
                            options={nameoptions}
                            onChange={(e) => changeSelectedNames(e)}
                            name="staff"
                            className="text-dark"
                            isSearchable
                            setValue
                          />

                          <br />
                          <p className="text-danger">{formErrors.staff}</p>
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
                            TA Name
                          </label>
                          <br />

                          <Select
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder={"Choose TA Names"}
                            isMulti
                            options={taoptions}
                            onChange={(e) => changeSelected(e)}
                            name="staff"
                            className="text-dark"
                            isSearchable
                            setValue
                          />

                          <br />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          {params.category == "undergraduate" ? (
                            <>
                              <div className="row">
                                <div className="col-md-12 mb-4 d-flex align-items-center">
                                  <div className="form-outline datepi+cker w-100">
                                    <label
                                      htmlFor="year"
                                      className="form-label"
                                    >
                                      Year
                                    </label>
                                    <br />

                                    <select
                                      className="select form-control-lg"
                                      onChange={(e) => handle(e)}
                                      name="year"
                                      value={data.year}
                                    >
                                      <option value="0" selected>
                                        Choose Grade
                                      </option>
                                      <option value="Year 1">Year 1</option>
                                      <option value="Year 2">Year 2</option>
                                      <option value="Year 3">Year 3</option>
                                      <option value="Year 4">Year 4</option>
                                    </select>

                                    <p className="text-danger">
                                      {formErrors.year}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-12 mb-4 d-flex align-items-center">
                                  <div className="form-outline datepi+cker w-100">
                                    <label htmlFor="" className="form-label">
                                      Semester
                                    </label>
                                    <br />

                                    <select
                                      className="select form-control-lg"
                                      onChange={(e) => handle(e)}
                                      name="semester"
                                      value={data.semester}
                                    >
                                      <option value="0" selected>
                                        Choose Semester
                                      </option>
                                      <option value="one">Semester 1</option>
                                      <option value="two">Semester 2</option>
                                    </select>
                                    <p className="text-danger">
                                      {formErrors.semester}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn button btn-lg mb-1">
                      Add Course
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
