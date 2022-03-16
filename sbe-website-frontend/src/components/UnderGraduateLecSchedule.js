import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UnderGraduateLecSchedule(isAuthenticated) {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExist,setIsExist] = useState(false)
  const [filesList, setFilesList] = useState([]);

  const [yearOneSchedule, setYearOneSchedule] = useState([]);
  const [yearTwoSchedule, setYearTwoSchedule] = useState([]);
  const [yearThreeSchedule, setYearThreeSchedule] = useState([]);
  const [yearFourSchedule, setYearFourSchedule] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);

  useEffect(() => {
    if (isAuthenticated && who.user != null && flag == false) {
      if (who.user.role == "dr" || who.user.role == "ta") {
        setIs_staff(true);
        if (who.user.is_coordinator) {
          setIsCoordinator(true);
        }
        flag = true;
      }

      if (who.user.role == "employee") {
        setIsEmp(true);
        if (who.user.is_moderator) {
          setIsModerator(true);
        }
      }

      if (who.user.is_admin) {
        setIsAdmin(true);
      }
    }
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/lecschedulesundergraduate/").then((res) => {
      setYearOneSchedule(res.data.filter((y1) => y1.year == "Year 1"));
      setYearTwoSchedule(res.data.filter((y2) => y2.year == "Year 2"));
      setYearThreeSchedule(res.data.filter((y3) => y3.year == "Year 3"));
      setYearFourSchedule(res.data.filter((y4) => y4.year == "Year 4"));
    }).catch((e)=>console.log(e))
  }, []);

  useEffect(() => {
    setAllSchedules(yearOneSchedule.concat(yearTwoSchedule, yearThreeSchedule, yearFourSchedule));
  }, [yearFourSchedule]);

  var fileDownload = require("js-file-download");

  function basename(path) {
    return path.split("/").reverse()[0];
  }

  const handlePDFDownload = (schedule) => {
    axios
      .get(`http://localhost:8000/api/download/${schedule.year}/lec`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, basename(schedule.schedule_file));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChangeFile = (e,schedule) => {
    const list = [];
    const files = e.target.files;
    console.log(files)
      if(schedule.schedule_file !== '/media/Lecs_Schedule/'+files[0].name){
        list.push(files[0])
      }else{
        setIsExist(true)
      }
    setFilesList(list);
  };

  const handleSubmit = (e,schedule) => {

    // e.preventDefault();
    let fileData = new FormData();
    
    fileData.append("year", schedule.year);
    fileData.append("schedule_file", filesList[0]);
    fileData.append("category", schedule.category);


    axios.put(`http://localhost:8000/api/lecschedule/${schedule.id}`,fileData).then((res)=>{
      console.log(res)
      }).catch((e)=>{
        console.log(e)
    })
  };

  return (
    <>
      <section className="h-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-8 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body ">
                  <p className="fs-2 text-light">Lectures Schedule</p>
                </div>
                <div>
                  <table className="table table-bordered  bg-light fs-4 col-12">
                    <thead>
                      <tr className="text-dark">
                        <th>Year</th>
                        <th>Download</th>
                      </tr>
                    </thead>

                    <tbody className="mb-3">
                      {allSchedules.map((schedule) => {
                        return (
                          <tr>
                            <td>
                              <Link className="admin-tables" to="#">{schedule.year.split(" ")[1]}</Link>
                            </td>
                            <td>
                              <div className="row">
                                <div className="col-5">
                              <Link to="#">
                                <button  className="btn btn-md "
                                  style={{
                                    color: "#ffff",
                                    background:"#003049"
                                  }}
                                   onClick={()=>handlePDFDownload(schedule)}>
                                  <FontAwesomeIcon
                                    className="fs-5"
                                    icon={faDownload}
                                  />{" "}
                                  Download Schedule
                                </button>
                              </Link>
                              </div>
                              {isModerator || isAdmin || isCoordinator ? (
                                <div className="col-7">
                                  <form onSubmit={(event) => handleSubmit(event,schedule)}>
                                    <input
                                      className="col-6 btn btn-md"
                                      type="file"
                                      onChange={(event) => handleChangeFile(event,schedule)}
                                    />
                                    <button
                                      type="submit"
                                      className="btn btn-md col-6"
                                      style={{
                                        color: "#003049",
                                      }}>
                                        <FontAwesomeIcon
                                          className="fs-5"
                                          icon={faUpload}
                                        />{" "}
                                        Upload Schedule
                                    </button>
                                    {
                                      isExist? <p className="text-danger">This file Already Exists</p> 
                                      : null
                                    }
                                  </form>
                                </div>
                              ) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-form"></div>
      </section>
    </>
  );
}

export default UnderGraduateLecSchedule;
