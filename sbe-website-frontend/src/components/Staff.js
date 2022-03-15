import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "../assets/css/staffcards.css";

export default function Staff() {

  const [staff,setStaff]=useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")
      .then((res) => setStaff(res.data));
  }, []);


  return (
    <>
      <section className="py-5 h-150 h-custom">
        <div className="container">
          <div className="col py-5">
            <div className="row starts">
              <h1 className="text-center fw-lighter text-light scroll">
                {" "}
                Staff List
              </h1>
              {/* <!-- Light Mode --> */}
              { staff.map((item)=>{
                  return(
                    <div className="col-sm-12 col-md-4">
                    <div className="justify-content-md-center">
                      <div className="card cardBorderCorners lightCard">
                        <div className="card-body">
                          <img
                            className="proPic proLight card-img rounded-circle"
                            src={item.profile_img}
                            alt="Profile Pic"
                          />
                          <h5 className="lightTitle card-title">
                            {item.fname} {item.lname}
                          </h5>
                          {/* <h6 className="lightSubTitle card-subtitle">
                            Front-End Developer
                          </h6> */}
                          <p className="lightDesc card-text">
                            {/* Hi, this is Vivekanand. I am a front-end developer from
                            India. I love Open Source and want to make web a better
                            place for the future generation. */}
                            {item.bio}
                          </p>
                          <p className="lightMail card-text">
                            <span className="lightMailText rounded">
                              {item.email}
                            </span>
                          </p>
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
      </section>
    </>
  );
}
