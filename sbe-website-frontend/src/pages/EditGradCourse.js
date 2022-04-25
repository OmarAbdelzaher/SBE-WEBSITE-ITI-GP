import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function EditGradCourse() {
  const params = useParams();
  const who = useSelector((state) => state.auth);

  let Url = `http://localhost:8000/api/graduatecourse/${params.id}`;
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [coursedata, setCoursedata] = useState({});
  const [Link, setLink] = useState();
  const [courseyear, setCourseyear] = useState();
  const [courseterm, setCourseterm] = useState();
  const [coursecode, setCoursecode] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/graduatecourse/${params.id}`)
      .then((res) => {
        setCoursedata(res.data);
        setLink(res.data.materials);
        setCourseyear(res.data.year);
        setCoursecode(res.data.code);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: params.name,
    total_grade: params.total_grade,
    instructions: params.instructions,
    staff_id: [params.staff_id],
    year: params.year,
  });

  const arr = params.staff_id.split(",");
  var newstaff = arr.filter(Number).map((c) => Number(c));

  if (who.user == null) {
    return <Redirect to="/" />;
  }
  if (who.user != null) {
    if (who.user.is_coordinator == false && who.user.is_admin == false) {
      return <Redirect to="/" />;
    }
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLinkChange = (e) => setLink(e.target.value);
  const onyearchange = (e) => setCourseyear(e.target.value);
  const ontermchange = (e) => setCourseterm(e.target.value);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.total_grade) {
      errors.total_grade = "Total Grade is required";
    }
    if (!values.instructions) {
      errors.instructions = "Instructions is required";
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(formData);
    setFormErrors(validate(formData));

    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();

      Data.append("code", coursecode);
      Data.append("name", formData.name);
      Data.append("total_grade", formData.total_grade);
      Data.append("instructions", formData.instructions);
      Data.append("materials", Link);

      newstaff.forEach((element) => {
        console.log(element);
        Data.append("staff_id", element);
      });
      //   Data.append("category", formData.category);
      Data.append("year", formData.year);
      //   Data.append("semester", courseterm);

      axios
        .put(Url, Data)
        .then((res) => {
          //   if (params.category == "graduate") {
          history.push(`/gradcoursedetails/${params.id}`);
          //   } else if (params.category == "undergraduate") {
          //     history.push(`/courseDetails/${params.id}`);
          //   }
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
    }
  };

  let minOffset = 0,
    maxOffset = 10;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }

  return (
    <>
      <section>
        <section className="h-150 h-custom">
          <div className="container py-5 h-150">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3 courses-b ">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Edit Course
                    </h3>
                    <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">{formErrors.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="description" className="form-label">
                              Total Grade
                            </label>
                            <br />
                            <input
                              type="number"
                              className="form-control form-control-lg"
                              id="total_grade"
                              name="total_grade"
                              value={formData.total_grade}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">
                              {formErrors.total_grade}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="instructions"
                              className="form-label"
                            >
                              Instructions
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="instructions"
                              name="instructions"
                              value={formData.instructions}
                              onChange={(e) => onChange(e)}
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
                              Material Link
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="materials"
                              name="materials"
                              value={Link}
                              onChange={(e) => onLinkChange(e)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <div className="row">
                              <div className="col-md-12 mb-4 d-flex align-items-center">
                                <div className="form-outline datepi+cker w-100">
                                  <label htmlFor="year" className="form-label">
                                    Year
                                  </label>
                                  <br />
                                  <select
                                    className="select form-control-lg col-12 "
                                    onChange={(e) => onChange(e)}
                                    name="year"
                                    value={formData.year}
                                  >
                                    {/* Default Value */}
                                    <option value="0">
                                      Please select Your Year
                                    </option>

                                    {allYears.map((item) => {
                                      return (
                                        <>
                                          <option
                                            href="#/action-2"
                                            style={{
                                              position: "relative",
                                              zIndex: "100",
                                            }}
                                            // key={item}
                                            value={item}
                                          >
                                            {" "}
                                            {item}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <button type="submit" className="btn button btn-lg mb-1">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
