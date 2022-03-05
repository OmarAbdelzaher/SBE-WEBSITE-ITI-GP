import React from "react";
import Header from "../components/header";
import axios from "axios";
import { useEffect, useState } from "react";

const ReservationForm = () => {
  const [timeslot, setTimeSlot] = useState([]);
  const [labs, setLabs] = useState([]);
  const [halls, setHalls] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/timeslots/")

      .then((res) => setTimeSlot(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/labs/")

      .then((res) => setLabs(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/halls/")

      .then((res) =>{console.log(res.data)
         setHalls(res.data)});
      
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/devices/")

      .then((res) => setDevices(res.data));
  }, []);

  const [formData, setFormData] = useState({
    ReserveDate: "",
    ReserveTime: "",
    ReserveType: "",
  });
  const { ReserveDate, ReserveTime, ReserveType } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // if (password === confirm_password) {
    //   signup(
    //     fname, lname, email, password, confirm_password ,birthdate,address,phone_number, gender,role, graduate,year_of_graduation,title
    //   );
    //   setAccountCreated(true);
    // }
  };

  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Reservation Form
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            id="ReservationDate"
                            onChange={(e) => onChange(e)}
                            name="ReserveDate"
                            value={formData.ReserveDate}
                          />
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Reservation Date
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          {/* <input
                            type="time"
                            className="form-control form-control-lg"
                            id="ReservationTime"
                          /> */}
                          <label
                            htmlFor="ReservationTime"
                            className="form-label"
                          >
                            Reservation Time
                          </label>
                          <select
                            className="select form-control-lg"
                            onChange={(e) => onChange(e)}
                            name="ReserveTime"
                            value={formData.ReserveTime}
                          >
                            {timeslot.map((item) => {
                              return (
                                <option value={item.timeslot}>
                                  {item.timeslot}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label">
                          Reservation Type
                        </label>
                        <select
                          className="select form-control-lg"
                          onChange={(e) => onChange(e)}
                          name="ReserveType"
                          value={formData.ReserveType}
                        >
                          {/* <option value={1} disabled>
                            Reservation Type
                          </option> */}
                          <optgroup label="Options 2">
                            <option>Option 2.1</option>
                            <option>Option 2.2</option>
                          </optgroup>
                          <optgroup label=" Hall">
                            {halls.map((item) => {
                              return(

                              <option>{item.name}</option>
                              )
                            })}
                          </optgroup>
                          {/* <option value="Hall">Hall</option> */}

                          <option value="Lab">Lab</option>
                          <option value="Device">Device</option>
                        </select>
                      </div>
                    </div>
                    <br></br>
                    {/* <div className="col-md-12 mb-4 pb-2">
            <div className="form-outline">
              <input type="text" id="ReservationName<" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="ReservationName<">Reservation Name</label>
            </div>
          </div> */}
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ReservationForm;
