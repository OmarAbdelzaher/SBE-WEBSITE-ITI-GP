import React from "react";
import Header from "../components/header";
import axios from "axios";
import { useEffect, useState } from "react";

const ReservationForm = () => {
  const [timeslot, setTimeSlot] = useState([]);
  const [labs, setLabs] = useState([]);
  const [halls, setHalls] = useState([]);
  const [devices, setDevices] = useState([]);
  
  // let EndPoints = [
  //   "http://localhost:8000/api/timeslots/",
  //   "http://localhost:8000/api/labs/",
  //   "http://localhost:8000/api/halls/",
  //   "http://localhost:8000/api/devices/"
  // ]
  
  // axios.all(EndPoints.map((endpoint) => axios.get(endpoint))).then(
  //   (data) =>{
  //     setTimeSlot(data[0]["data"])
  //     setLabs(data[1]["data"])
  //     setHalls(data[2]["data"])
  //     setDevices(data[3]["data"])
  //   }
  // );

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
      .then((res) => setHalls(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/devices/")
      .then((res) => setDevices(res.data));
  }, []);

  const [formData, setFormData] = useState({
    ReserveDate: "",
    ReserveTime: "",
    ReserveType: "hall",
    reserveHalls:"",
    reserveLabs:"",
    reserveDevices:""
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
                          <label
                            htmlFor="ReservationTime"
                            className="form-label"
                          >
                            Reservation Time
                          </label> {" "}
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
                          <option value="hall">Halls</option>
                          <option value="lab">Labs</option>
                          <option value="device">Devices</option>
                        </select>
                          
                          {formData.ReserveType == "hall" ? (
                            <>
                            <br/>
                            <div >
                              <div >
                                <label htmlFor="hall">Pick a Hall</label>
                                <select
                                  className="select form-control-lg"
                                  value={formData.reserveHalls}
                                  onChange={(e) => onChange(e)}
                                  name="reserveHalls"
                                >
                                  <option disabled>Available Halls</option>
                                  {halls.map((item) => {
                                  return(
                                  <option value={item.name}>{item.name}</option>
                                  )
                                })}
                                </select>
                              </div>
                          </div>
                          
                          </>
                          ):null}
                          
                          {formData.ReserveType == "lab" ? (
                            <div className="row">
                              <div className="col-12">
                                <label htmlFor="lab">Pick a Lab</label>
                                <select
                                  className="select form-control-lg"
                                  value={formData.reserveLabs}
                                  onChange={(e) => onChange(e)}
                                  name="reserveLabs"
                                >
                                {labs.map((item) => {
                                return(
                                  <option value={item.name}>{item.name}</option>
                                )
                                })}
                                </select>
                              </div>
                          </div>
                          ):null}

                          {formData.ReserveType == "device" ? (
                            <div className="row">
                              <div className="col-12">
                                <label htmlFor="device">Pick a Device</label>
                                <select
                                  className="select form-control-lg"
                                  value={formData.reserveDevices}
                                  onChange={(e) => onChange(e)}
                                  name="reserveDevices"
                                >
                                {devices.map((item) => {
                                return(
                                  <option value={item.name}>{item.name}</option>
                                )
                                })}
                                </select>
                              </div>
                          </div>
                          ):null}
                      </div>
                    </div>
                    <br></br>
                    <button
                      type="submit"
                      className="btn button btn-lg mb-1"
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
