import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

function RegistrationApprove() {

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  const moderator = useSelector((state) => state.auth);
  const [staff, setStaff] = useState([]);
  const [student, setStudent] = useState([]);
  const [emp, setEmp] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      .then((res) => setStaff(res.data.filter((s) => s.is_active == false)));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/")
      .then((res) =>
        setStudent(res.data.filter((st) => st.is_active == false))
      );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/facultyemps/")
      .then((res) => setEmp(res.data.filter((e) => e.is_active == false)));
  }, []);

  function onChange(e) {
    if (e.target.value == "stf") {
      setPerson(staff);
    } else if (e.target.value == "std") {
      setPerson(student);
    } else if (e.target.value == "emp") {
      setPerson(emp);
    } else if (e.target.value == "Request Type") {
      alert("Choose a proper Request Type");
    }
  }

  if(moderator.user == null)
  {
    return <Redirect to="/" />;  
  }
  if (moderator.user != null )
  {
    if ( moderator.user.is_moderator == false  && moderator.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }



  let url = "";

  const ActivateUser = (user) => {
    let userData = new FormData();

    if (user.role == "dr" || user.role == "ta") {
      userData.append("role",user.role)
      url = `http://localhost:8000/api/onestaff/${user.id}`;
    } else if (user.role == "student") {
      url = `http://localhost:8000/api/student/${user.id}`;
      userData.append("graduate", user.graduate);
      userData.append("year_of_graduation", user.year_of_graduation);
    } else if (user.role == "employee") {
      url = `http://localhost:8000/api/facultyemp/${user.id}`;
      userData.append("title", user.title);
    }

    userData.append("fname", user.fname);
    userData.append("lname", user.lname);
    userData.append("email", user.email);

    // userData.append("profile_img", user.profile_img);

    userData.append("address", user.address);
    userData.append("gender", user.gender);
    userData.append("birthdate", user.birthdate);
    userData.append("phone_number", user.phone_number);
    userData.append("password", user.password);

    userData.append("is_active", true);

    axios
      .put(url, userData)
      .then((res) => {
        const user_update = person.filter((item) => item.id !== user.id);
        setPerson(user_update);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <section className=" main">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body">
                <p className="fs-1 text-light"> Registration Menu</p>

                <select
                  className="select form-control-lg btn btn-md col-3"
                  style={{ backgroundColor: "#003049", color: "#ffff" }}
                  onChange={(e) => onChange(e)}
                  name="ReserveType"
                  value={person}
                >
                  <option selected value="Request Type">User Requests</option>
                  <option value="stf">Staff Requests</option>
                  <option value="std">Students Requests</option>
                  <option value="emp">Employee Requests</option>
                </select>
              </div>
              <div>
                <table className="table  bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>#</th>
                      <th className="text-dark fw-light">First Name</th>
                      <th className="text-dark fw-light">Last Name</th>
                      <th className="text-dark fw-light">Mail</th>
                      <th className="text-dark fw-light">Action</th>
                    </tr>
                  </thead>

                  <tbody className="fs-5">
                    {person.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.fname}</td>
                          <td>{item.lname}</td>
                          <td>{item.email}</td>
                          <td>
                            <Link  to="#">
                              <button
                                className="btn btn-md nav-links"
                                onClick={() => {
                                  ActivateUser(item);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="fs-5 "
                                  icon={faUserCheck}
                                />{" "}
                                Activate
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegistrationApprove;
