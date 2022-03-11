import React from "react";
import { useSelector } from "react-redux";
import {useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function OfficeHours() {
  let Url = `http://localhost:8000/api/officehours/`;
  const history = useHistory();
  const who = useSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState({});
  const [OfficeHourErrors, setOfficeHourErrors] = useState({});
  const [formData, setFormData] = useState({
    day: "",
    start: "",
    end: "",
    staff_id: "",
    officehours_type:"",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) => {
    const errors = {};

    let temp_start = values.start.split(":")
    let startHour = temp_start[0]
    let startMin = temp_start[1]
    let startSec = "00"

    let temp_end = values.end.split(":")
    let endHour = temp_end[0]
    let endMin = temp_end[1]
    let endSec = "00"

    let startTimeObject = new Date();
    startTimeObject.setHours(startHour, startMin, startSec);

    let endTimeObject = new Date(startTimeObject);
    endTimeObject.setHours(endHour, endMin, endSec);





    if (!values.start) {
      errors.start = "Start time is required";
    }
    if (!values.end) {
      errors.end = "End time is required";
    }
    if( startTimeObject > endTimeObject)
    {
        errors.end = "End time can't be before start "
    }
    if (values.day == "Weekdays" || values.day == "" ) {
      errors.day = "Please , Select a day  ";
    }
    if (values.officehours_type == "officehours_type" || values.officehours_type == "" ) {
        errors.officehours_type = "Please , Select a type ";
      }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(formData);
    setOfficeHourErrors(validate(formData));

    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();

      if (who.user != null) {
        console.log(who.user);
        formData.staff_id = who.user.id;
        Data.append("staff_id", formData.staff_id);
      }

      Data.append("officehours_type", formData.officehours_type);
      Data.append("weekday", formData.day);
      Data.append("from_hour", formData.start);
      Data.append("to_hour", formData.end);

      axios
        .post(Url, Data)
        .then((res) => {
          console.log(res.data);
          history.push("/");
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
          
        });
    }
  };

  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 courses-b ">
                {/* <img
                  src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                /> */}
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Office Hours Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                  <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="Weekdays" className="form-label">
                              Office Hours Type
                          </label>
                          <br />
                          <select
                            className="select form-control-lg"
                            name="officehours_type"
                            value={formData.officehours_type}
                            onChange={(e) => onChange(e)}
                            id="Weekdays"
                          >
                            <option selected value="officehours_type">
                             Office Hours Type 
                            </option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            
                          </select>
                        </div>
                      </div>
                    </div>
                    {OfficeHourErrors.officehours_type ? (
                      <div class="alert alert-danger" role="alert">
                        {OfficeHourErrors.officehours_type}
                      </div>
                    ) : null}

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="Weekdays" className="form-label">
                            Week Days
                          </label>
                          <br />
                          <select
                            className="select form-control-lg"
                            name="day"
                            value={formData.day}
                            onChange={(e) => onChange(e)}
                            id="Weekdays"
                          >
                            <option selected value="Weekdays">
                              Week Days
                            </option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {OfficeHourErrors.day ? (
                      <div class="alert alert-danger" role="alert">
                        {OfficeHourErrors.day}
                      </div>
                    ) : null}

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="StartTime" className="form-label">
                            Start Time
                          </label>
                          <br />
                          <input
                            type="time"
                            className="form-control form-control-lg"
                            id="StartTime"
                            name="start"
                            value={formData.start}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {OfficeHourErrors.start ? (
                      <div class="alert alert-danger" role="alert">
                        {OfficeHourErrors.start}
                      </div>
                    ) : null}

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label htmlFor="EndTime" className="form-label">
                            End Time
                          </label>
                          <br />
                          <input
                            type="time"
                            className="form-control form-control-lg"
                            id="EndTime"
                            name="end"
                            onChange={(e) => onChange(e)}
                            value={formData.end}
                          />
                        </div>
                      </div>
                    </div>
                    {OfficeHourErrors.end ? (
                      <div class="alert alert-danger" role="alert">
                        {OfficeHourErrors.end}
                      </div>
                    ) : null}

                    {formErrors ==
                    "The fields weekday, from_hour, to_hour, staff_id must make a unique set." ? (
                      <div class="alert alert-danger" role="alert">
                        Office hours already exist 
                      </div>
                    ) : null}
                    <button type="submit" className="btn button btn-lg mb-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  );
}
