import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function UnderGraduateExamSchedule(isAuthenticated) {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExist,setIsExist] = useState(false)
  const [filesList, setFilesList] = useState([]);

  const [yearOneExam, setYearOneExam] = useState([]);
  const [yearTwoExam, setYearTwoExam] = useState([]);
  const [yearThreeExam, setYearThreeExam] = useState([]);
  const [yearFourExam, setYearFourExam] = useState([]);
  const [allExams, setAllExams] = useState([]);

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
    axios.get("http://localhost:8000/api/examschedules/").then((res) => {
      setYearOneExam(res.data.filter((y1) => y1.year == "Year 1"));
      setYearTwoExam(res.data.filter((y2) => y2.year == "Year 2"));
      setYearThreeExam(res.data.filter((y3) => y3.year == "Year 3"));
      setYearFourExam(res.data.filter((y4) => y4.year == "Year 4"));
    }).catch((e)=>console.log(e))
  }, []);

  useEffect(() => {
    setAllExams(yearOneExam.concat(yearTwoExam, yearThreeExam, yearFourExam));
  }, [yearFourExam]);

  var fileDownload = require("js-file-download");

  function basename(path) {
    return path.split("/").reverse()[0];
  }

  const handlePDFDownload = (exam) => {
    axios
      .get(`http://localhost:8000/api/download-exam-lec/${exam.year}/exam`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, basename(exam.exam_file));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChangeFile = (e,exam) => {
    const list = [];
    const files = e.target.files;
    console.log(files)
      if(exam.exam_file !== '/media/Exams_Schedule/'+files[0].name){
        list.push(files[0])
      }else{
        setIsExist(true)
      }
    setFilesList(list);
  };

  const handleSubmit = (e,exam) => {

    // e.preventDefault();
    let fileData = new FormData();
    
    fileData.append("year", exam.year);
    fileData.append("exam_file", filesList[0]);

    axios.put(`http://localhost:8000/api/examschedule/${exam.id}`,fileData).then((res)=>{
      console.log(res)
      }).catch((e)=>{
        console.log(e)
    })
  };

  return (
    <>
      <section className="h-custom py-5">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body ">
                  <p className="fs-2">Exams Schedule</p>
                </div>
                <div>
                  <table className="table table-bordered border-primary bg-light fs-4 col-12">
                    <thead>
                      <tr className="text-dark">
                        <th>Year</th>
                        <th>Download</th>
                      </tr>
                    </thead>

                    <tbody className="mb-3">
                      {allExams.map((exam) => {
                        return (
                          <tr>
                            <td>
                              <Link className="admin-tables" to="#">{exam.year.split(" ")[1]}</Link>
                            </td>
                            <td>
                              <Link to="#">
                                <button className="btn button" onClick={()=>handlePDFDownload(exam)}>
                                  <FontAwesomeIcon
                                    className="fs-5"
                                    icon={faDownload}
                                  />{" "}
                                  Download Schedule
                                </button>
                              </Link>

                              {isModerator || isAdmin || isCoordinator ? (
                                <div>
                                  <form onSubmit={(event) => handleSubmit(event,exam)}>
                                    <input
                                      type="file"
                                      onChange={(event) => handleChangeFile(event,exam)}
                                    />
                                    <button className="btn button">
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
      </section>
    </>
  );
}

export default UnderGraduateExamSchedule;
