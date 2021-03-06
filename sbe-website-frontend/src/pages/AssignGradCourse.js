import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// select-react import
import Select from "react-select";
import makeAnimated from "react-select/animated";
let listing = [];
let fordoc = [];

export default function AssignGradCourse() {
  const params = useParams();
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const [doctors, setDoctors] = useState([]);
  const [courses, setCourse] = useState([]);
  const [coursestaff, setCoursestaff] = useState([]);

  const who = useSelector((state) => state.auth);

  const url = `http://localhost:8000/api/graduatecourse/${params.id}`;
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/graduatecourse/${params.id}`)
      .then((res) => setData(res.data));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/graduatecourse/${params.id}`)
      .then((res) =>{ setCourse(res.data)
        setCoursestaff(res.data.staff_id)
      })

  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")

      .then((res) => setDoctors(res.data));
  }, []);

  const [data, setData] = useState({
    code: "",
    coursename: params.name,
    totalgrade: "",
    instructions: params.instructions,
    materials: params.materials,
    year: params.year,
    // semester: params.semester,
    staff: "",
    // category: params.category,
  });

  if (who.user != null) {
    if (who.user.is_coordinator == false && who.user.is_admin == false) {
      return <Redirect to="/" />;
    }
  }

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
    let List_names = Object.values(e);
    let chosen = [];
    for (let t of List_names) {
      chosen.push(parseInt(t.value));
    }
    listing = chosen;
    let docandta = [];
    docandta = fordoc.concat(chosen);
    setData({
      ...data,
      staff: docandta,
    });
  };

  const changeSelected = (e) => {
    let List_names = Object.values(e);
    let tachoose = [];
    for (let t of List_names) {
      tachoose.push(parseInt(t.value));
    }
    fordoc = tachoose;
    let concatlist = [];
    concatlist = listing.concat(tachoose);
    setData({
      ...data,
      staff: concatlist,
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.staff) {
      errors.staff = "Staff Name is Required";
    }
    return errors;
  };

  function onSubmit(e) {
    e.preventDefault();
    let errors_form = validate(data);

    setFormErrors(errors_form);
    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();

      data.staff.forEach((element) => {
        Data.append("staff_id", element);
        // console.log(element);
      });
      Data.append("code", courses.code);
      Data.append("name", courses.name);
      Data.append("total_grade", courses.total_grade);
      Data.append("instructions", courses.instructions);
      Data.append("materials", courses.materials);
      Data.append("year", courses.year);
    //   Data.append("semester", courses.semester);
    //   Data.append("category", courses.category);

      axios
        .put(url, Data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          setData(res.data);
          history.push(`/gradcoursedetails/${params.id}`);
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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 fs-2 fw-bold">
                    Assign Course
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <h2 htmlFor="ReservationDate" className="form-label ">
                            Course Name :
                          </h2>
                          <p className="fw-light fs-4 text-white ">
                            - {courses.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <h2 htmlFor="ReservationDate" className="form-label font-weight-bold">
                            Current Staff :
                          </h2>

            

                          {coursestaff.map((item) => {
                            return (
                              <>
                                <p className="fw-light fs-4 text-white"> {item[1]}</p>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="staff" className="form-label">
                            Doctor Name
                          </label>
                          <br />
                          <Select
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            placeholder={"Choose Staff Names"}
                            isMulti
                            options={nameoptions}
                            onChange={(e) => changeSelectedNames(e)}
                            name="staff"
                            className="text-dark"
                            isSearchable
                            setValue
                          />
                          <p className="text-danger">{formErrors.staff}</p>
                          <br />
                          <br />
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

                    <button type="submit" className="btn button btn-lg mb-1">
                      Assign Course
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
