import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile(isAuthenticated) {
  const who = useSelector((state) => state.auth);

  let StudentUrl = "";
  let StaffUrl = "";
  let EmpUrl = "";
  let PersonUrl = "";
  let Url = "";

  const [User, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    profile_img: "",
    gender: "",
    address: "",
    birthdate: "",
    phone_number: "",
    password: "",
    graduate: "",
    year_of_graduation: "",
    title: "",
    role: "",
    bio: "",

    is_active:"",
    is_coordinator:"",
    is_admin:"",
    is_moderator:"",
  });

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

    if (who.user.is_admin) {
      Url = PersonUrl;
    }
  }

  useEffect(() => {
    axios.get(Url).then((res)=>{
      setUser(res.data)
    })
  }, []);


  return (
    <section className="py-5 h-150 h-custom">
<div className="row py-5 px-4">
        <div className="col-md-8 mx-auto">
          {/* Profile widget */}
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3"><img src={User.profile_img} alt="..." className="rounded mb-2 img-thumbnail" width={200} /></div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0"> </h4>
                  <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2" /></p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br><div className="bg-light p-4 d-flex justify-content-left text-center">
            <h2 className="font-italic mb-0">{User.fname} {User.lname}</h2>
      </div>
      <br></br>
            <div className="px-4 py-3">
              <h5 className="mb-0"></h5>
              <h5 class="mb-0">More Info</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                {User.role =="dr" ? <h4 className="font-italic mb-0">Role <p p className="pdata">Dr</p></h4> : null}
                {User.role =="ta" ? <h4 className="font-italic mb-0">Role <p p className="pdata">TA</p></h4> : null}
                {User.role =="student" ? <h4 className="font-italic mb-0">Role <p p className="pdata">Student</p></h4> : null}
                <h4 className="font-italic mb-0">Email <p p className="pdata">{User.email}</p></h4>
                <h4 className="font-italic mb-0">Address <p p className="pdata">{User.address}</p></h4>
                <h4 className="font-italic mb-0">Birthdate <p p className="pdata">{User.birthdate}</p></h4>
                <h4 className="font-italic mb-0">Phone Number <p className="pdata">{User.phone_number}</p></h4>
                { User.bio != "" ? <h4 className="font-italic mb-0">Bio <p className="pdata">{User.bio}</p></h4> : null }
                
              </div>
            </div>
            <br></br>
            <div className="row">
                            <div className="col d-flex justify-content-end">
                            <Link to="/edit-profile">
                              <button
                                className="btn btn-lg button"
                              >
                                Edit Profile
                              </button>
                              </Link>
                            </div>
                            </div>
                            <br></br>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
