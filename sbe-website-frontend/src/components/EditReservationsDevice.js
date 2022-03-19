import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';

export default function EditReservationDevice(isAuthenticated) {
  const params = useParams();
  const history = useHistory();
  const staff = useSelector((state) => state.auth);
  const slot = params.time.split(",");

  let staff_id = null;
  let ReserveDeviceUrl = `http://localhost:8000/api/reserveddevice/${params.id}`;
  let ReserveUrl = "";

  if (isAuthenticated && staff.user != null) {
    staff_id = staff.user.id;
  }

  const [timeslot, setTimeSlot] = useState([]);
  const [devices, setDevices] = useState([]);
  const [uniqueErr, setUniqueErr] = useState();
  const [timeSlotErr, setTimeSlotErr] = useState();

  const [successState, setSuccesState] = useState();

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    ReserveDate: params.date,
    ReserveTime: slot[1],
    ReserveType: params.type,
    toBeReserved: params.name,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/timeslots/")
      .then((res) => setTimeSlot(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/devices/")
      .then((res) => setDevices(res.data));
  }, []);
  if(staff.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (staff.user != null )
  {
    if (staff.user.is_moderator == false && staff.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) => {
    const errors = {};
    var now = new Date();
    var reserveDate = new Date(values.ReserveDate);

    if (reserveDate.getTime() < now.getTime() || values.ReserveDate === "") {
      errors.ReserveDate = "Enter an upcoming or a valid date";
    }
    if (values.ReserveTime === "Available Slots" || values.ReserveTime === "") {
      errors.ReserveTime = "Enter a valid Reservation Time";
    }
    if (
      values.toBeReserved === "Available Devices" ||
      values.toBeReserved === ""
    ) {
      errors.toBeReserved = "Enter a valid Device";
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(formData);
    setFormErrors(errors_form);
    let reserved = "";

    if (Object.keys(errors_form).length === 0) {
      if (formData.ReserveType === "device") {
        ReserveUrl = ReserveDeviceUrl;
        reserved = "device_id";
      }
      const Data = new FormData();
      Data.append("date", formData.ReserveDate);
      Data.append("timeslot", formData.ReserveTime);
      Data.append(reserved, formData.toBeReserved);
      Data.append("staff_id", params.staff);
      axios
        .put(ReserveUrl, Data)
        .then((res) => {
          console.log(res.data);
          setSuccesState(res.status);
          history.push("/devicesreservations");
        })
        .catch((e) => {
          setTimeSlotErr(e.response.data.timeslot[0]);
          setUniqueErr(e.response.data.non_field_errors[0]);
        });
    }
  };

  return (
    <>
      <section style={{ height: "200vh" }}>
        <section className="h-custom">
          <div className="container py-5 h-150">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3 courses-b ">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Edit Device Reservation
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
                            </label>
                            <br />
                            <input
                              type="date"
                              className="form-control form-control-lg"
                              id="ReservationDate"
                              onChange={(e) => onChange(e)}
                              name="ReserveDate"
                              value={formData.ReserveDate}
                            />
                            {formErrors.ReserveDate ? (
                              <div class="alert alert-danger" role="alert">
                                {formErrors.ReserveDate}
                              </div>
                            ) : null}
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
                            </label>
                            <br />
                            <select
                              className="select form-control-lg"
                              onChange={(e) => onChange(e)}
                              name="ReserveTime"
                              value={formData.ReserveTime}
                            >
                              <option selected value="Available Slots">
                                Available Slots
                              </option>
                              {timeslot.map((item, index) => {
                                return (
                                  <option value={index + 1}>
                                    {item.timeslot}
                                  </option>
                                );
                              })}
                            </select>
                            {timeSlotErr ? (
                              <div class="alert alert-danger" role="alert">
                                Please , Pick a time slot
                              </div>
                            ) : null}
                            {formErrors.ReserveTime ? (
                              <p className="text-danger">
                                {formErrors.ReserveTime}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <label className="form-label select-label">
                            Reservation Type
                          </label>
                          <br />

                          <select
                            className="select form-control-lg"
                            onChange={(e) => onChange(e)}
                            name="ReserveType"
                            value={formData.ReserveType}
                          >
                            <option value="device">Devices</option>
                          </select>
                          <br />
                          <div>
                            <div>
                              <label htmlFor="hall">Pick a Device</label>
                              <br />
                              <select
                                className="select form-control-lg"
                                value={formData.toBeReserved}
                                onChange={(e) => onChange(e)}
                                name="toBeReserved"
                              >
                                <option selected value="Available Devices">
                                  Available Devices
                                </option>
                                {devices.map((item) => {
                                  return (
                                    <option value={item.id}>{item.name}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          {formErrors.toBeReserved ? (
                            <div class="alert alert-danger" role="alert">
                              {formErrors.toBeReserved}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <br />
                      <button type="submit" className="btn button btn-lg mb-1">
                        Submit
                      </button>
                      <br />
                      {uniqueErr ==
                      "The fields hall_id, date, timeslot must make a unique set." ? (
                        <div class="alert alert-danger" role="alert">
                          Sorry, Already Resreved Device in this slot
                        </div>
                      ) : null}
                      {successState == "201"
                        ? alert(
                            "Reservation Request Sent, Wait for confirmation"
                          )
                        : null}
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
