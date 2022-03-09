import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function RegistrationApprove() {
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

  function onChange(e){

    if (e.target.value == "stf"){
        setPerson(staff)
    }
    else if (e.target.value == "std"){
        setPerson(student)
    }
    else if (e.target.value == "emp"){
        setPerson(emp)
    }
    else if (e.target.value == "Request Type"){
        alert("Choose a proper Request Type")
    }
  }
  
  let url = ""
  
  const ActivateUser = (user) => {
    
    let userData = new FormData()

    if (user.role == "dr" || user.role == "ta"){
      url = `http://localhost:8000/api/onestaff/${user.id}`
    }
    else if (user.role == "student"){
      url = `http://localhost:8000/api/student/${user.id}`
      userData.append("graduate", user.graduate);
      userData.append("year_of_graduation", user.year_of_graduation);
    }
    else if (user.role == "employee"){
      url = `http://localhost:8000/api/facultyemp/${user.id}`
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


    axios.put(url,userData).then((res)=>{
      
      const user_update = person.filter( item => item.id !== user.id  )
      setPerson(user_update)

    }).catch((e)=>{
      console.log(e)
    })

  };

  return (
    <>
      <section className="h-custom ">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="sidebar justify-content-center">
                <AdminNav />
              </div>
              <div className="card-body ">
                <p className="fs-1"> SBE DEPARTMENT</p>
                <p className="fs-3"> - Registration Menu</p>
              </div>
              <div>

              <select className="select form-control-lg btn button" 
                onChange={(e) => onChange(e)}
                name="ReserveType"
                value={person}>

                <option selected value="Request Type">User Requests</option>
                <option value="stf">Staff Requests</option>
                <option value="std">Students Requests</option>
                <option value="emp">Employee Requests</option>

              </select>

                <table className="table table-bordered border-primary bg-light fs-4 col-12">
                  <thead>
                    <tr className="text-dark">
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Mail</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="mb-3">
                    {person.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.fname}</td>
                          <td>{item.lname}</td>
                          <td>{item.email}</td>
                          <td>
                            <Link to="#">
                              <button
                                className="btn button"
                                onClick={() => {
                                  ActivateUser(item);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="fs-5"
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
