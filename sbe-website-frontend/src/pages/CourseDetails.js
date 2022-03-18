import React from "react";
import { Link, useParams ,useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Linking, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faDownload,
  faLink,
  faUpload,
  faGear,
  faTrashAlt ,
} from "@fortawesome/free-solid-svg-icons";


let flag = false;

function CourseDetails(isAuthenticated) {
  const who = useSelector((state) => state.auth);
  const history = useHistory();

  const params = useParams();
  const [course, setCourse] = useState({});
  const [filesList, setFilesList] = useState([]);
  const [material, setMaterial] = useState([]);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExist, setIsExist] = useState(false);

  const [link, setLink] = useState();

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

  let mat_id = 0;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/course/${params.id}`).then((res) => {
      setCourse(res.data);
      console.log(res.data.staff_id)
      setLink(res.data.materials);
      mat_id = res.data.id;
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/uploadmaterials/").then((res) => {
      let checkArrived = res.data.filter((mat) => mat.course_id == mat_id) 
      if (checkArrived.length > 0){
        setMaterial(res.data.filter((mat) => mat.course_id == mat_id));
      }
      else{
        MaterialApi()
      }
    });
  }, []);

  function MaterialApi(){
    axios.get("http://localhost:8000/api/uploadmaterials/").then((res) => {
      let checkArrived = res.data.filter((mat) => mat.course_id == mat_id) 
      if (checkArrived.length > 0){
      setMaterial(res.data.filter((mat) => mat.course_id == mat_id));
      }
    })
  }

  const handleChangeFile = (e, type) => {
    const list = [];
    const files = e.target.files;

    if (type == "mat") {
      for (let element of files) {
        if (
          material.find(
            (mat) =>
              mat.material_upload === "/media/student_material/" + element.name
          ) == undefined
        ) {
          list.push(element);
        }
      }
    } else if (type == "grades") {
      if (course.stds_grades !== "/media/student_grades/" + files[0].name) {
        list.push(files[0]);
      } else {
        setIsExist(true);
      }
    }
    setFilesList(list);
  };

  const onChange = (e) => setLink(e.target.value);

  const handleSubmit = (e, type) => {
    // e.preventDefault();

    let formData = new FormData();
    let fileData = new FormData();

    filesList.forEach((element) => {
      fileData.append("material_upload", element);
      fileData.append("course_id", course.id);
    });

    if (type == "mat") {
      axios
        .post("http://localhost:8000/api/uploadmaterials/", fileData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (type == "mat-link" || type == "grades") {
      if (type == "mat-link") {
        formData.append("materials", link);
      } else {
        formData.append("materials", course.materials);
      }
      if (type == "grades") {
        formData.append("stds_grades", filesList[0]);
      }

      formData.append("name", course.name);
      formData.append("total_grade", course.total_grade);
      formData.append("instructions", course.instructions);
      // possible error if the one who uploads is not the course staff (may be admin or coordinator)
      formData.append("staff_id", who.user.id);
      formData.append("category", course.category);
      formData.append("year", course.year);
      formData.append("semester", course.semester);

      axios
        .put(`http://localhost:8000/api/course/${params.id}`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  var fileDownload = require("js-file-download");

  function basename(path) {
    return path.split("/").reverse()[0];
  }

  const handlePDFDownload = (downType) => {
    if (downType == "grades") {
      axios
        .get(`http://localhost:8000/api/download/${course.id}/grade`, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, basename(course.stds_grades));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (downType == "materials") {
      for (let i = 0; i < material.length; i++) {
        axios
          .get(`http://localhost:8000/api/download/${material[i].id}/mat`, {
            responseType: "blob",
          })
          .then((res) => {
            fileDownload(res.data, basename(material[i].material_upload));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:8000/api/course/${params.id}`)
      .then((res) => {
        // const selectedcourse = course.filter((item) => item.id !== id);
        // setCourse(selectedcourse);
        history.push("/coursesMenu");

      })
      .catch((e) => {
        console.log(e);
      });
    }
  return (
    <>
      <section className="h-custom">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-xl-8 card rounded-3 courses-b border border-2 border-light">
              <div className="card-body p-4 ">
                <h1 className="mb-4 pb-2 pb-md-0  px-md-2 bg-light rounded text-center nav-links ">
                  {course.name}
                </h1>
                {/* Assign Button  */}
                {isCoordinator || isAdmin ? (
                  <Link
                    className="btn btn-md col-3"
                    style={{ backgroundColor: "#003049", color: "#ffff" }}
                    to={`/assigncourse/${course.id}/${course.name}/`}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                    {"  "}
                    Assign Course
                  </Link>
                ) : null}
                <br/>

                {/* Edit Button */}
                {isCoordinator || isAdmin ? (
                  <Link
                    className="btn btn-md col-3 fs-5 mt-4"
                    style={{ backgroundColor: "#003049", color: "#ffff" }}
                    to={`/editcourse/${course.id}/${course.name}/${course.total_grade}/${course.instructions}/${course.staff_id}/${course.category}/${course.year}/${course.semester}`}
                  >
                    <FontAwesomeIcon icon={faGear} />
                    {"  "}
                    Edit Course
                  </Link>
                ) : null}
                <br/>
                {/* Delete Button */}
                {isCoordinator || isAdmin ? (
                  <Link to="#">
                  <button
                    style={{ backgroundColor: "red" ,color: "#ffff" }}
                    className="btn btn-sm mt-4 fs-5"
                    onClick={() => {
                        deleteCourse(course.id);
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ color: "white" }}
                      className="fs-5"
                      icon={faTrashAlt}
                    />{" "}Delete 
                  </button>
                </Link>
                ) : null}
              </div>
              <div className="row justify-content-center align-items-center ">
                <div className="col-6">
                  <div className=" cards card col-12">
                    <h2 className="card-title py-3 text-center text-dark">
                      Course Instructions
                    </h2>
                    <p className="col-12 p-3 fs-5 text-start text-dark">
                      {course.instructions}
                    </p>
                  </div>
                  <div className=" row col-12">
                    <div className="col-12">
                      <button className="button btn cards ">
                        <Link
                          style={{ textDecoration: "none", color: "#ffff" }}
                          className="ani fs-5"
                          to={`/course-history/${course.id}`}
                        >
                          Show Course History
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="col-12  ">
                    <div className="row card cards border border-2 d-flex justify-content-center align-items-center">
                      <div className="py-3 col-12">
                        <h3 className="card-title text-dark  py-2">
                          Materials
                        </h3>
                      </div>
                      <div className="row text-center d-flex justify-content-center align-items-center ">
                        <div className="col-12">
                          {/* {upload materials} */}

                          {is_staff || isAdmin || isCoordinator ? (
                            <div>
                              <form
                                onSubmit={(event) =>
                                  handleSubmit(event, "mat-link")
                                }
                              >
                                <label style={{ color: "#003049" }}>
                                  <FontAwesomeIcon icon={faLink} /> Material
                                  Link
                                </label>{" "}
                                <input
                                  className="col-12"
                                  name="material_link"
                                  type="text"
                                  value={link}
                                  onChange={(e) => onChange(e)}
                                />
                                <button
                                  type="submit"
                                  className="btn btn-md col-7"
                                  style={{
                                    color: "#003049",
                                  }}
                                >
                                  Update Link
                                </button>
                              </form>
                              
                              {material ? (
                                <form
                                  onSubmit={(event) =>
                                    handleSubmit(event, "mat")
                                  }
                                >
                                  <div className=" d-flex justify-content-center align-items-center">
                                    <input
                                      className="col-5 text-dark"
                                      type="file"
                                      multiple
                                      onChange={(event) =>
                                        handleChangeFile(event, "mat")
                                      }
                                    />
                                    <br />
                                    <br />
                                    <button
                                      type="submit"
                                      className="btn btn-md col-7"
                                      style={{
                                        color: "#003049",
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faUpload} />
                                      Upload Material
                                    </button>
                                  </div>
                                  <br />
                                </form>
                              ) : null}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-12 text-center">
                          {course.materials ? (
                            <TouchableOpacity>
                              <Text
                                className="card-text "
                                style={{
                                  color: "#03045e",
                                  fontSize: "21px",
                                }}
                                onPress={() =>
                                  Linking.openURL(course.materials)
                                }
                              >
                                Click to Material Link
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <p
                              className="card-text fs-6"
                              style={{ color: "red" }}
                            >
                              No Materials link available yet
                            </p>
                          )}

                          {/* {download materials} */}
                          <br />
                          <button
                            className="btn btn-md col-8"
                            style={{ backgroundColor: "#003049" }}
                          >
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#ffff",
                              }}
                              onClick={() => handlePDFDownload("materials")}
                             to="#">
                              <FontAwesomeIcon icon={faDownload} />
                              {"  "}
                              Download
                            </Link>
                          </button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row card cards border border-2 d-flex justify-content-center align-items-center">
                      <h3 className="card-title py-3 col-12 text-dark ">
                        Grades
                      </h3>

                      {/* {upload grades} */}

                      {is_staff || isAdmin || isCoordinator ? (
                        <div>
                          <form
                            onSubmit={(event) => handleSubmit(event, "grades")}
                          >
                            <div className=" d-flex justify-content-center align-items-center">
                              <input
                                className="col-5 text-dark"
                                type="file"
                                onChange={(event) =>
                                  handleChangeFile(event, "grades")
                                }
                              />
                              <button
                                type="submit"
                                className="btn btn-md col-7"
                                style={{
                                  color: "#003049",
                                }}
                              >
                                <FontAwesomeIcon icon={faUpload} /> Upload
                                Grades
                              </button>
                            </div>
                            {isExist ? (
                              <p className="text-danger">
                                This file Already Exists
                              </p>
                            ) : null}
                          </form>
                        </div>
                      ) : null}

                      {/* {download grades} */}
                      {course.stds_grades ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <br />
                          <button
                            className="btn btn-md col-6 "
                            style={{ backgroundColor: "#003049" }}
                            onClick={() => handlePDFDownload("grades")}
                          >
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#ffff",
                              }}
                              to="#"
                            >
                              <FontAwesomeIcon icon={faDownload} />
                              {"  "}
                              Download
                            </Link>
                          </button>{" "}
                          <br />
                          <br />
                          <br />
                        </div>
                      ) : (
                        <p
                          className="card-text col-12 d-flex justify-content-center align-items-center"
                          style={{ color: "red" }}
                        >
                          No Grades uploaded yet
                        </p>
                      )}
                    </div>
                  </div>
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

export default CourseDetails;
