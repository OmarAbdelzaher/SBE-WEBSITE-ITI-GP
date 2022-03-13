import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


function Profile(isAuthenticated) {
  const who = useSelector((state) => state.auth);
  const history = useHistory();
  const [changed,setChanged]=useState(false)

  let StudentUrl = "";
  let StaffUrl = "";
  let EmpUrl = "";
  let PersonUrl = "";
  let Url = "";

  const [User, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    profile_img:"",
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
  const pattern_email = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (who.user != null) {
    StudentUrl = `http://localhost:8000/api/student/${who.user.id}`;
    StaffUrl = `http://localhost:8000/api/onestaff/${who.user.id}`;
    EmpUrl = `http://localhost:8000/api/facultyemp/${who.user.id}`;
    PersonUrl = `http://localhost:8000/api/person/${who.user.id}`;

    if (who.user.role == "student") {
      Url = StudentUrl;
    } else if (who.user.role == "dr" || who.user.role == "ta") {
      Url = StaffUrl;
    } else if ((who.user.role = "employee")) {
      Url = EmpUrl;
    }

    if(who.user.is_admin){
      Url = PersonUrl
    }
  }

  const validate = (values) =>{
    const errors = {}
    if (!values.fname) {
      errors.fname = "First Name is Required";
    }
    if (!values.lname) {
      errors.lname = "Last Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is required !";

    } else if (!pattern_email.test(values.email)) {
      errors.email = "Email is invalid !";
    }
    if (!values.phone_number){
      errors.phone_number = "Phone Number is required";

    } else if (values.phone_number.length != 11 )
    {
      errors.phone_number = "Phone Number must be 11 digits"  
    }
    if (!values.address)
    {
      errors.address = " Address is required "
    }
    var now = new Date();
    var birthdate = new Date(values.birthdate)
    if(!values.birthdate)
    {
      errors.birthdate = "BirthDate is required"
    }
    else if(birthdate.getTime() > now.getTime() )
    {
      errors.birthdate = "Enter a valid birth date which is a past date "
    } 
    return errors
  }

  
  useEffect(() => {
    axios.get(Url).then((res)=>{
      setUser(res.data)
    })
  }, []);

  const onChange = (e) => setUser({ ...User, [e.target.name]: e.target.value });


  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setChanged(true)
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(User)
    setFormErrors(errors_form)

    if ( Object.keys(errors_form).length === 0  )
    {
    const Data = new FormData();

    if (who.user.role == "student") {
      //Repeated Line
      Url = StudentUrl;
      Data.append("year_of_graduation", User.year_of_graduation);
      Data.append("graduate", User.graduate);
    } else if (who.user.role == "dr" || who.user.role == "ta") {
      //Repeated Line
      Url = StaffUrl;
    } else if ((who.user.role = "employee")) {
      //Repeated Line
      Url = EmpUrl;
      Data.append("title", User.title);
    }

    if(changed==true){
      User.profile_img=picture
    }
    Data.append("fname", User.fname);
    Data.append("lname", User.lname);
    Data.append("email", User.email);
    Data.append("profile_img", User.profile_img);
    Data.append("address", User.address);
    Data.append("gender", User.gender);
    Data.append("birthdate", User.birthdate);
    Data.append("phone_number", User.phone_number);
    Data.append("password", User.password);
    Data.append("role", User.role);


      axios.put(Url, Data).then((res)=>{
        history.push("/");
      }).catch((e)=>console.log(e))
    }
  };

  return (
    <section className="py-5 h-150 h-custom">
      <div className="container">
        <div className="col py-5">
          <div className="row">
            <div className="col mb-3">
              <div className="card ">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{ width: "140px" }}>
                          <div
                            className="d-flex justify-content-center align-items-center rounded"
                            style={{
                              height: "140px",
                            }}
                          >
                            <img  style={{ width: "140px" }} src={User.profile_img}/>

                          <div>
                          </div>
                          
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
                          <div className="mt-2 button">
                            <button className="btn text-light" type="button">
                             <input type="file" onChange={onChangePicture} />
                             <FontAwesomeIcon className="fs-4" icon={faCamera} />{" "}
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
                              <div className="form-group ">
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
                                className="btn btn-lg button"
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