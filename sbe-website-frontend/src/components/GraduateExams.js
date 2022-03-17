import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function GraduateExamSchedule(isAuthenticated) {
  let flag = false;
  const who = useSelector((state) => state.auth);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [filesList, setFilesList] = useState([]);

  const [graduateScheduleExam, setGraduateScheduleExam] = useState([]);

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
      let graduateExams = res.data.filter(
        (exam) => exam.category == "graduate"
      );
      setGraduateScheduleExam(graduateExams.reverse()[0]);
    });
  }, []);

  var fileDownload = require("js-file-download");

  function basename(path) {
    return path.split("/").reverse()[0];
  }

  const handlePDFDownload = () => {
    axios
      .get(
        `http://localhost:8000/api/download-exam-lec/${String(
          graduateScheduleExam.id
        )}/exam`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        fileDownload(res.data, basename(graduateScheduleExam.exam_file));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeFile = (e) => {
    const list = [];
    const files = e.target.files;
    list.push(files[0]);
    setFilesList(list);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    let fileData = new FormData();

    fileData.append("exam_file", filesList[0]);
    fileData.append("category", graduateScheduleExam.category);

    axios
      .put(
        `http://localhost:8000/api/examschedule/${graduateScheduleExam.id}`,
        fileData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <section className="h-custom ">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-8 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body ">
                  <p className="fs-2 text-light">Exams Schedule</p>
                </div>
                <div>
                  <table className="table table-bordered  bg-light fs-4 col-12">
                    <thead>
                      <tr className="text-dark">
                        <th>Type</th>
                        <th>Download</th>
                      </tr>
                    </thead>

                    <tbody className="mb-3">
                      <tr>
                        <td>Master</td>
                        <td>
                          <div className="row">
                            <div className="col-5">
                              <Link to="#">
                                <button
                                  className="btn btn-md "
                                  style={{
                                    color: "#ffff",
                                    background: "#003049",
                                  }}
                                  onClick={() => handlePDFDownload()}
                                >
                                  <FontAwesomeIcon
                                    className="fs-6"
                                    icon={faDownload}
                                  />{" "}
                                  Download Schedule
                                </button>
                              </Link>
                            </div>
                            {isModerator || isAdmin || isCoordinator ? (
                              <div className="col-7">
                                <form onSubmit={(event) => handleSubmit(event)}>
                                  <input
                                    className="col-6 btn btn-md"
                                    type="file"
                                    onChange={(event) =>
                                      handleChangeFile(event)
                                    }
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-md col-6"
                                    style={{
                                      color: "#003049",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      className="fs-5"
                                      icon={faUpload}
                                    />{" "}
                                    Upload Schedule
                                  </button>
                                </form>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>
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

export default GraduateExamSchedule;
