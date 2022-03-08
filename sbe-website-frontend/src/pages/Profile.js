import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile(isAuthenticated) {
  const who = useSelector((state) => state.auth);
  const history = useHistory();

  let StudentUrl = "";
  let StaffUrl = "";
  let EmpUrl = "";
  let Url = "";

  const [User, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    address: "",
    birthdate: "",
    phone_number: "",
    password: "",

    graduate: "",
    year_of_graduation: "",

    title: "",

    role: "",
  });

  const [FormErrors,setFormErrors] = useState({})
  const {
    fname,
    lname,
    email,
    birthdate,
    address,
    phone_number,
  } = User;

  const pattern_email = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (who.user != null) {
    StudentUrl = `http://localhost:8000/api/student/${who.user.id}`;
    StaffUrl = `http://localhost:8000/api/onestaff/${who.user.id}`;
    EmpUrl = `http://localhost:8000/api/facultyemp/${who.user.id}`;
  }

  if (who.user.role == "student") {
    Url = StudentUrl;
  } else if (who.user.role == "dr" || who.user.role == "ta") {
    Url = StaffUrl;
  } else if ((who.user.role = "employee")) {
    Url = EmpUrl;
  }

  const validate = (values) =>{
    const errors = {}
    let flag = true;
    if (!values.fname) {
      errors.fname = "First Name is Required";
      flag = false
    }
    if (!values.lname) {
      errors.lname = "Last Name is Required";
      flag = false

    }
    if (!values.email) {
      errors.email = "Email is required !";
      flag = false

    } else if (!pattern_email.test(email)) {
      errors.email = "Email is invalid !";
      flag = false

    }
    if (!values.phone_number){
      errors.phone_number = "Phone Number is required";
      flag = false

    } else if (phone_number.length != 11 )
    {
      errors.phone_number = "Phone Number must be 11 digits"  
      flag = false

    }
    if (!values.address)
    {
      errors.address = " Address is required "
      flag = false

    }
    var now = new Date();
    var birthdate = new Date(values.birthdate)
    if(!values.birthdate)
    {
      errors.birthdate = "BirthDate is required"
      flag = false


    }
    else if(birthdate.getTime() > now.getTime() )
    {
      errors.birthdate = "Enter a valid birth date which is a past date "
      flag = false

      
    } 
    return errors
  }


  useEffect(() => {
    axios.get(Url).then((res)=>{
      console.log(res.data)
      setUser(res.data)
    })
  }, []);

  const onChange = (e) => setUser({ ...User, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(User)
    setFormErrors(errors_form)

    if ( Object.keys(errors_form).length === 0  )
    {
    const Data = new FormData();

    if (who.user.role == "student") {
      Url = StudentUrl;
      Data.append("year_of_graduation", User.year_of_graduation);
      Data.append("graduate", User.graduate);
    } else if (who.user.role == "dr" || who.user.role == "ta") {
      Url = StaffUrl;
    } else if ((who.user.role = "employee")) {
      Url = EmpUrl;
      Data.append("title", User.title);
    }

    Data.append("fname", User.fname);
    Data.append("lname", User.lname);
    Data.append("email", User.email);
    Data.append("address", User.address);
    Data.append("gender", User.gender);
    Data.append("birthdate", User.birthdate);
    Data.append("phone_number", User.phone_number);
    Data.append("password", User.password);

    try {
      axios.put(Url, Data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }};

  return (
    <section className="h-150 h-custom">
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{ width: "140px" }}>
                          <div
                            className="d-flex justify-content-center align-items-center rounded"
                            style={{
                              height: "140px",
                              backgroundColor: "rgb(233, 236, 239)",
                            }}
                          >
                            <span
                              style={{
                                color: "rgb(166, 168, 170)",
                                font: "bold 8pt Arial",
                              }}
                            >
                              140x140
                            </span>
                          </div>
                          <div className="text-muted">
                            <small>Last login 2 hours ago</small>
                          </div>
                        </div>
                      </div>
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                            {User.fname} {User.lname}
                          </h4>
                          <p className="mb-0">{User.email}</p>
                          <p className="mb-2">{User.graduate}</p>
                          <div className="mt-2">
                            <button className="btn btn-dark" type="button">
                              <i className="fa fa-fw fa-camera" />
                              <span>Change Photo</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a href className="active nav-link">
                          Personal Data
                        </a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        <form
                          className="form-group-lg"
                          onSubmit={(e) => onSubmit(e)}
                          noValidate
                        >
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  className="form-control input-lg"
                                  type="text"
                                  name="fname"
                                  placeholder="First Name"
                                  value={User.fname}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.fname }</p>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  className="form-control input-lg"
                                  type="text"
                                  name="lname"
                                  placeholder="Last Name"
                                  value={User.lname}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.lname }</p>
                            </div>
                          </div>
                          <br></br>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="email"
                                  placeholder="user@example.com"
                                  value={User.email}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.email }</p>
                            </div>
                          </div>
                          <br></br>

                          <div className="col-md-6 mb-4">
                            <h6 className="mb-2 pb-1">Gender: </h6>
                            <div onChange={(e) => onChange(e)}>
                              <input
                                type="radio"
                                value="M"
                                name="gender"
                                checked={User.gender === "M"}
                              />{" "}
                              Male
                              <input
                                type="radio"
                                value="F"
                                name="gender"
                                checked={User.gender === "F"}
                              />{" "}
                              Female
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                  className="form-control"
                                  type="number"
                                  name="phone_number"
                                  placeholder="01120796294"
                                  value={User.phone_number}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.phone_number }</p>
                            </div>
                          </div>
                          <br></br>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>Address</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="address"
                                  placeholder="Nasr city, Cairo"
                                  value={User.address}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.address }</p>
                            </div>
                          </div>
                          <br></br>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label>Birthdate</label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="birthdate"
                                  placeholder=""
                                  value={User.birthdate}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <p className="text-danger">{ FormErrors.birthdate }</p>
                            </div>
                          </div>
                          <br></br>
                          <div className="row">
                            <br></br>
                          </div>
                          <div className="row">
                            <div className="col d-flex justify-content-end">
                              <button
                                className="btn btn-dark btn-lg"
                                type="submit"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
