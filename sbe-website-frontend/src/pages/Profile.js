import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faAlignLeft, faCalendarDay, faEdit, faEnvelope, faLocationArrow, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";

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

    is_active: "",
    is_coordinator: "",
    is_admin: "",
    is_moderator: "",
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
    axios.get(Url).then((res) => {
      setUser(res.data);
    });
  }, [Url]);

  return (
    <section className=" h-150 h-custom">
      <div className="row px-4">
        <div className="col-md-8 mx-auto">
          {/* Profile widget */}
          <div className="courses-b shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">

                <div className="profile mr-3 ">
                  <img
                    src={User.profile_img}
                    alt="..."
                    className="rounded mb-2 img-thumbnail"
                    width={200}
                  />
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0"> </h4>
                  <p className="small mb-4">
                    {" "}
                    <i className="fas fa-map-marker-alt mr-2" />
                  </p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row"> 
            <div className="p-4 d-flex justify-content-left text-center col-9">
              <h2 className="font-italic mb-0">
                {User.fname} {User.lname}</h2>
            </div>
            <div className="p-4  text-end col-3 btn-sm">
            <Link to="/edit-profile" className="fs-6 p-4" style={{ textDecoration:"none", color:"#ffff" }}>
                <FontAwesomeIcon className="fs-6" icon={faEdit} />{" "}Edit Profile</Link>
              </div>
              </div>
            <br></br>
            <div className="px-4 py-3">
              <div className="p-4 rounded shadow border">
                {User.role == "dr" ? (
                  <h4 className="fst-italic fw-bold mb-0 ">
                    <FontAwesomeIcon icon={faAddressCard} />{" "}
                    Role{" "}
                    <p p className="pdata">
                      Dr
                    </p>
                  </h4>
                ) : null}
                {User.role == "ta" ? (
                  <h4 className="fst-italic fw-bold mb-0 ">
                    <FontAwesomeIcon icon={faAddressCard} />{" "}

                    Role{" "}
                    <p p className="pdata">
                      TA
                    </p>
                  </h4>
                ) : null}
                {User.role == "student" ? (
                  <h4 className="fst-italic fw-bold mb-0 ">
                   <FontAwesomeIcon icon={faAddressCard} />{" "}

                    Role{" "}
                    <p p className="pdata">
                      Student
                    </p>
                  </h4>
                ) : null}
                  {User.role == "employee" ? (
                  <h4 className="fst-italic fw-bold mb-0 ">
                   <FontAwesomeIcon icon={faAddressCard} />{" "}

                    Role{" "}
                    <p p className="pdata">
                      {User.title}
                    </p>
                  </h4>
                ) : null}
                <h4 className="fst-italic fw-bold mb-0 ">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                  Email{" "}
                  <p p className="pdata">
                    {User.email}
                  </p>
                </h4>
                <h4 className="fst-italic fw-bold mb-0">
                <FontAwesomeIcon icon={faLocationArrow} />{" "}
                  Address{" "}
                  <p p className="pdata">
                    {User.address}
                  </p>
                </h4>
                <h4 className="fst-italic fw-bold mb-0">
                <FontAwesomeIcon icon={faCalendarDay} />{" "}
                  Birthdate{" "}
                  <p p className="pdata">
                    {User.birthdate}
                  </p>
                </h4>
                <h4 className="fst-italic fw-bold mb-0">
                <FontAwesomeIcon icon={faMobileScreenButton} />{" "}
                  Phone Number <p className="pdata">{User.phone_number}</p>
                </h4>
                {User.bio ? (
                  <h4 className="fst-italic fw-bold mb-0">
                    <FontAwesomeIcon icon={faAlignLeft} />{" "}
                    Bio <p className="pdata">{User.bio}</p>
                  </h4>
                ) : null}
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
