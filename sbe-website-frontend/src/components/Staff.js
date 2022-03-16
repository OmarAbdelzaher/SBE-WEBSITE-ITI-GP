import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/staffcards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faInbox } from "@fortawesome/free-solid-svg-icons";

export default function Staff() {

  const [staff,setStaff]=useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      .then((res) => setStaff(res.data));
  }, []);


  return (
    <>
      <section className="h-150 h-custom">
        <div className="container">
          <div className="col py-5">
            <div className="row starts bg-light ">
              <h1 className="text-center fw-lighter text-light scroll ">
                {" "}
                Our Team
              </h1>
              <div className="row"> 
              {/* <!-- Light Mode --> */}
              { staff.map((item)=>{
                  return(
                    <div className="col-6 ">
                  
                      <div className=" border-0  mb-4 h-100 d-flex justify-content-center align-items-center">
                        <div className="row g-0 "> 
                          <div className="col-md-3 d-flex justify-content-center align-items-center">
                          <img
                            className="img-fluid rounded-circle "
                            src={item.profile_img}
                            alt="Profile Pic"
                          />
                          </div>
                          <div className="col-md-8">
                           <div className="card-body">

                          {item.role == "dr" ? <h5 className="lightTitle card-title">
                            Dr/ {item.fname} {item.lname}
                          </h5> : null }
                          {item.role == "ta" ? <h5 className="lightTitle card-title">
                            Eng./ {item.fname} {item.lname}
                          </h5> : null }
                          <p className="lightDesc card-text" >
                            {item.bio}
                          </p>
                          <p className="lightMail card-text">
                            <span className=" rounded" style={{ color:"#9b2226" }}>
                            <FontAwesomeIcon icon={faEnvelope}/> {" "}
                              {item.email}
                            </span>
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  
                  )
              })
             
}
</div>
            </div>
          </div>
        </div>
        <div className="margin-b"></div>
      </section>
    </>
  );
}
