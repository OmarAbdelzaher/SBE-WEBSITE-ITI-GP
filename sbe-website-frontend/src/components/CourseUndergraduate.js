import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CourseUnderGraduate() {
  const [ungraduatecourse, setUngraduateCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courseungraduate/")
      .then((res) => setUngraduateCourse(res.data));
  }, []);

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
  };
  const start = {
    marginTop: "150px",
  };

  return (
    <>
      <div style={start}>
        <div className="container-fluid mt-2">
          <div className="row">
            {ungraduatecourse.map((item) => {
              return (
                <div className="col-md-9 col-sm-12">
                  <div class="card " key={item.id}>
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <p class="card-text">Category:{item.category}</p>
                      <p class="card-text">Staff ID:{item.staff_id}</p>
                      <p class="card-text">instructions:{item.instructions}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/graduatepage" className="nav-link">
            <button className="btn btn-danger btn-lg mb-5 " style={btnStyle}>
              Return Under Graduated Page{" "}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
