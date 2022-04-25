import React, { useEffect, useState } from "react";
import axios from "axios";
import { reset_password } from "../actions/auth";

export default function OfficeHoursSchedule() {
  const [staff, setStaff] = useState();
  const [officehours, setOfficeHours] = useState();
  const [oh_list, setOhList] = useState();
 

  useEffect(() => {
    axios.get("http://localhost:8000/api/staff/").then((res) => {
      setStaff(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/officehours/")
      .then((res) => setOfficeHours(res.data));
  }, []);

  const onChange = (e) => {
    let staffID = e.target.value;
    setOhList(officehours.filter((oh) => oh.staff_id == staffID));
  };
  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="card-body row">
                <p className="fs-2 text-light col-12"> OfficeHours Schedule</p>
                <div className="bg-opacity-25 bg-light col-lg-4 col-sm-12 row justify-content-center">
                  <div className="col-lg-6 col-xl-6 col-sm-6">
                    <div>
                      <select
                        className="select form-control-lg btn  col-12"
                        style={{ color: "#ffff" }}
                        onChange={(e) => onChange(e)}
                        name="staffmenu"
                        value="asdasd"
                      >
                        <option
                          selected
                          value="staffmenu"
                          className="bg-light text-dark"
                        >
                          Dr Menu
                        </option>
                        {staff != undefined
                          ? staff
                              .filter((item) => item.role === "dr")
                              .map((item, index) => {
                                return (
                                  <option
                                    value={item.id}
                                    className="bg-light text-dark"
                                  >
                                    Dr/ {item.fname} {item.lname}{" "}
                                  </option>
                                );
                              })
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className=" col-lg-6 col-xl-6 col-sm-6">
                    <div>
                      <select
                        className="select form-control-lg btn col-12"
                        style={{ color: "#ffff" }}
                        onChange={(e) => onChange(e)}
                        name="staffmenu"
                        value="asdasd"
                      >
                        <option
                          selected
                          value="staffmenu"
                          className="bg-light text-dark"
                        >
                          Ta Menu
                        </option>
                        {staff != undefined
                          ? staff
                              .filter((item) => item.role === "ta")
                              .map((item, index) => {
                                return (
                                  <option
                                    value={item.id}
                                    className="bg-light text-dark"
                                  >
                                    Eng./ {item.fname} {item.lname}{" "}
                                  </option>
                                );
                              })
                          : null}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
                <table class="table table-hover bg-light fs-5 ">
                  <thead>
                    <tr className="text-dark ">
                      <th scope="col">#</th>
                      <th scope="col" className="text-dark fw-light">
                        OfficeHour Type
                      </th>
                      <th scope="col" className="text-dark fw-light">
                        Week Day
                      </th>
                      <th scope="col" className="text-dark fw-light">
                        From
                      </th>
                      <th scope="col" className="text-dark fw-light">
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody className="mb-3">
                    {oh_list != undefined
                      ? oh_list.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td className="admin-tables">
                                {item.officehours_type}
                              </td>
                              <td className="admin-tables">{item.weekday}</td>
                              <td className="admin-tables">{item.from_hour}</td>
                              <td className="admin-tables">{item.to_hour}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
            </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  );
}
