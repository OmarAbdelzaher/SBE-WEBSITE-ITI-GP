import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight} from "@fortawesome/free-solid-svg-icons";

export default function CourseGraduate() {
  const [graduatecourse, setGraduateCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/coursegraduate/")
      .then((res) => setGraduateCourse(res.data));
  }, []);

  const imgEvent = {
    height: "250px",
  };

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
    // background:'blue',
  };
  const start = {
    // color: 'red',
    // width: '50%',
    // height: '50%',
    marginTop: "150px",
    // background:'blue',
  };

  return (
    <>
      <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-8 card rounded-3 courses-b border border-2 border-light">
              <div className="margin">
                <div className="card-body">
                  <h1 className="mb-4 pb-2 pb-md-0 px-md-2">
                    Graduate Courses
                  </h1>
                </div>
                <div className="row table-b">
                  <table className="text-light table table-hover fs-4">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                      </tr>
                    </thead>
                    {graduatecourse.map((item) => {
                      return (
                        <>
                        <tbody className="fs-4 mb-3" key={item.id}>
                          <tr className='tr'>
                          {/* <td className='table-b'> {item.name}</td> */}
                          <td><Link className='table-b'  to={`/courseDetails/${item.id}`}>{item.name}</Link></td>
                          <td><Link to={`/courseDetails/${item.id}`}><FontAwesomeIcon icon={faAnglesRight} style={{color:"#ffff"}}/></Link></td>
                          {/* <td className='table-b'> {`${item.staff_id }`}  </td> */}
                          </tr>
                        </tbody>
                        
                        </>
                      );
                    })}
                     </table>
                </div>
                </div>
             
            </div>
            <div className="c-form py-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
