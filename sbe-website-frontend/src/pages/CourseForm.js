import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Select, { components } from "react-select";
import Select from "react-select";

export default function CourseForm() {
  const history = useHistory();

  const who = useSelector((state) => state.auth);
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
  const [data, setData] = useState({
    name: "",
    totalgrade: "",
    // Stdgrades: "",
    instructions: "",
    materials: "",
    year: "",
    semester: "",
    staff: "",
    category: "",
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

    // if (!values.materials){
    //   errors.materials = "Materials is Required"
    // }

    if (!values.year) {
      errors.year = "Year is required";
    }
    if (!values.semester) {
      errors.semester = " Semester is required ";
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

      // if (who.user != null) {
      //     // console.log(who.user);
      //     data.staff = who.user.id;
      //     Data.append("staff_id", data.staff);
      // }
      // const filooo = e.target.files;

      Data.append("name", data.name);
      Data.append("total_grade", data.totalgrade);
      // Data.append("stds_grades", data.Stdgrades);
      Data.append("staff_id", data.staff);

      Data.append("instructions", data.instructions);
      Data.append("materials", data.materials);
      Data.append("year", data.year);
      Data.append("semester", data.semester);
      Data.append("category", data.category);

      axios
        .post(url, Data)
        .then((res) => {
          console.log(res.data);

          history.push("/coursesMenu");
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
      //   .catch((e) => {
      //     setFormErrors(e.response.data.non_field_errors[0]);

      //   });
    }
  }

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });

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
                    Add Course Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Name{" "}
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="name"
                            type="text"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
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
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Total grade
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="totalgrade"
                            type="number"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
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
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Instructions
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="instructions"
                            type="text"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
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
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Material Link{" "}
                          </label>
                          <br />
                          <input
                            onChange={(e) => handle(e)}
                            id="materials"
                            type="text"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
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
                          <label
                            htmlFor="ReservationDate"
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
                            <option selected>Choose Grade</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                            <option value="grade4">Grade 4</option>                            
                          </select>

                          {/* <input
                            onChange={(e) => handle(e)}
                            id="year"
                            type="number"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
                            name="year"
                            value={data.year}
                          /> */}
                          <p className="text-danger">{formErrors.year}</p>
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
                            Semester
                          </label>
                          <br />
                          {/* <input
                            onChange={(e) => handle(e)}
                            id="semester"
                            type="number"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
                            name="semester"
                            value={data.semester}
                          /> */}
                          <select
                            className="select form-control-lg"
                            onChange={(e) => handle(e)}
                            name="semester"
                            value={data.semester}
                          >
                            <option selected>Choose Semester</option>
                            <option value="one">Semester 1</option>
                            <option value="two">Semester 2</option>
                          </select>
                          <p className="text-danger">{formErrors.semester}</p>
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
                          {/* <input
                            onChange={(e) => handle(e)}
                            id="staff"
                            type="number"
                            className="form-control form-control-lg"
                            // onChange={(e) => onChange(e)}
                            name="year"
                            value={data.year}
                          /> */}
                          <select
                            id="multiselect staff"
                            multiple="multiple"
                            className="select form-control-lg"
                            value={data.staff}
                            onChange={(e) => handle(e)}
                            name="staff"
                          >
                            {/* 
<Select
      isMulti
      onChange={(e) => handle(e)}
      value={doctors.id}
      name="staff"
      labelKey='fname'
      valueKey='id'
      defaultValue={[doctors[0]]}
      // isClearable={false}
      options={doctors}
      // components={{ MultiValueRemove }}
    /> */}
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

                            {/* <option value="undergraduate">Undergraduate</option> */}
                          </select>
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
                          <br />

                          <p className="text-danger"></p>
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
