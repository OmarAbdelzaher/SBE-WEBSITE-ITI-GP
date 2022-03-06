import React from "react";
import Header from "../components/header";
import axios from "axios";
import { useEffect, useState } from "react";

const ReservationForm = () => {
  const [timeslot, setTimeSlot] = useState([]);
  const [labs, setLabs] = useState([]);
  const [halls, setHalls] = useState([]);
  const [devices, setDevices] = useState([]);
  
  let ReserveHallUrl = "http://localhost:8000/api/reservedhalls/"
  let ReserveLabUrl = "http://localhost:8000/api/reservedlabs/"
  let ReserveDeviceUrl = "http://localhost:8000/api/reserveddevices/"
  let ReserveUrl = ""

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
    toBeReserved:""
  });

  const [formErrors,setFormErrors] = useState({}) 

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) =>{
    const errors = {}
    
    var now = new Date();
    var reserveDate = new Date(values.ReserveDate)

    if (reserveDate.getTime() < now.getTime() || values.ReserveDate === ''){
      errors.ReserveDate = "Enter an upcoming or a valid date"
    }
    if(values.ReserveTime === "Available Slots" || values.ReserveTime === ''){
      errors.ReserveTime = "Enter a valid Reservation Time"
    }
    if(values.toBeReserved === "Available Halls" || values.toBeReserved === ''){
      errors.toBeReserved = "Enter a valid Hall"
    }
    else if(values.toBeReserved === "Available Labs" || values.toBeReserved === ''){
      errors.toBeReserved = "Enter a valid Lab"
    }
    else if(values.toBeReserved === "Available Devices" || values.toBeReserved === ''){
      errors.toBeReserved = "Enter a valid Device"
    }
    return errors
  }
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    let errors_form = validate(formData)
    setFormErrors(errors_form)
    let reserved = ""

    if ( Object.keys(errors_form).length === 0  )
    {
      if (formData.ReserveType === "hall"){
        ReserveUrl = ReserveHallUrl
        reserved = "hall_id"
      }
      else if (formData.ReserveType === "lab"){
        ReserveUrl = ReserveLabUrl
        reserved = "lab_id"
      }
      else if (formData.ReserveType === "device"){
        ReserveUrl = ReserveDeviceUrl
        reserved = "device_id"
      }
      const Data = new FormData();
      Data.append('date',formData.ReserveDate)
      Data.append('timeslot',formData.ReserveTime)
      Data.append(reserved,formData.toBeReserved)
      // Data.append('staff_id',formData.staff_id)
      Data.append('staff_id',2)
      
      console.log(formData.ReserveTime)
      axios.post(ReserveUrl,Data)
    }
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
                          <label
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Reservation Date
                          </label><br/>
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            id="ReservationDate"
                            onChange={(e) => onChange(e)}
                            name="ReserveDate"
                            value={formData.ReserveDate}
                          />
                          <p className="text-danger">{ formErrors.ReserveDate }</p>
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
                          </label><br/>
                          <select
                            className="select form-control-lg"
                            onChange={(e) => onChange(e)}
                            name="ReserveTime"
                            value={formData.ReserveTime}
                          >
                            <option selected value="Available Slots">Available Slots</option>
                            {timeslot.map((item,index) => {
                              return (
                                <option value={index+1}>
                                  {item.timeslot}
                                </option>
                              );
                            })}
                          </select>
                          <p className="text-danger">{ formErrors.ReserveTime }</p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label">
                          Reservation Type
                        </label><br/>
                        
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
                                <label htmlFor="hall">Pick a Hall</label><br/>
                                <select
                                  className="select form-control-lg"
                                  value={formData.toBeReserved}
                                  onChange={(e) => onChange(e)}
                                  name="toBeReserved"
                                >
                                  <option selected value="Available Halls">Available Halls</option>
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
                                <label htmlFor="lab">Pick a Lab</label><br/>
                                <select
                                  className="select form-control-lg"
                                  value={formData.toBeReserved}
                                  onChange={(e) => onChange(e)}
                                  name="toBeReserved"
                                >
                                <option selected value="Available Labs">Available Labs</option>
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
                                <label htmlFor="device">Pick a Device</label><br/>
                                <select
                                  className="select form-control-lg"
                                  value={formData.toBeReserved}
                                  onChange={(e) => onChange(e)}
                                  name="toBeReserved"
                                >
                                <option selected value="Available Devices">Available Devices</option>
                                {devices.map((item) => {
                                return(
                                  <option value={item.name}>{item.name}</option>
                                )
                                })}
                                </select>
                              </div>
                          </div>
                          ):null}
                          <p className="text-danger">{ formErrors.toBeReserved }</p>
                      </div>
                    </div>
                    <br></br>
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
