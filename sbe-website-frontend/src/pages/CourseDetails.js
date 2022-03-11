import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Linking, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

let flag = false;

function CourseDetails(isAuthenticated) {
  const who = useSelector((state) => state.auth);

  const params = useParams();
  const [course, setCourse] = useState({});
  const [filesList, setFilesList] = useState([]);
  const [material, setMaterial] = useState([]);
  const [is_staff, setIs_staff] = useState(false);
  const [is_emp, setIsEmp] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      mat_id = res.data.id;
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/uploadmaterials/").then((res) => {
      setMaterial(res.data.filter((mat) => mat.course_id == mat_id));
    });
  }, []);

  const handleChangeFile = (e) => {
    const list = [];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      list.push(files[i]);
    }
    console.log(list)
    setFilesList(list);
  };

  // const onChange = (e) =>
  //   course.materials = e.target.value ;

  const handleSubmit = (e,type) => {

    e.preventDefault();

    let formData = new FormData();
    let fileData = new FormData();

    console.log(filesList);

    filesList.forEach((element) => {
      fileData.append("material_upload", element);
      fileData.append("course_id", course.id);
    });

    if(type == "mat"){
      axios.post("http://localhost:8000/api/uploadmaterials/",fileData).then((res)=>{
        console.log(res)}).catch((e)=>{
          console.log(e)
        })
    }

    formData.append("name", course.name);
    formData.append("total_grade", course.total_grade);
    formData.append("instructions", course.instructions);
    formData.append("materials", course.materials);
    formData.append("staff_id", who.user.id);
    formData.append("category", course.category);
    formData.append("year", course.year);
    formData.append("semester", course.semester);
    formData.append("stds_grades",filesList[0]);

    if(type == "grades"){
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
    console.log(path)
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
      console.log(material)
      console.log(material[0])
      console.log(material[0].id)

      axios
        .get(`http://localhost:8000/api/download/${material[0].id}/mat`,{
          responseType: "blob",
        })
        .then((res) => {
          console.log(res)
          console.log(res.data)
          fileDownload(res.data, basename(material[0]));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section className=" h-custom py-5">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
              <div className="">
                <div className="card-body p-4 p-md-5">
                  <h1 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 bg-light rounded text-center nav-links border border-dark">
                    {course.name}
                  </h1>
                </div>

                <div className="row justify-content-center align-items-center">
                  <div className="row col-6  ">
                    <div className="col-12 card cards justify-content-center align-items-center ">
                      <h2 className="col-12 card-title bg-light py-3 text-dark">
                        Course Instructions
                      </h2>
                      <p className="col-12 card-text fs-4 text-dark">
                        {course.instructions}
                      </p>
                    </div>

                    <div className="btn button col-12 card cards justify-content-center align-items-center ">
                      <Link
                        className="btn button fs-4"
                        to={`/course-history/${course.id}`}
                      >
                        Show Course History
                      </Link>
                    </div>
                  </div>

                  <div className=" row col-4 offset-1">
                    <div className="row card cards col-10 text-center border border-2 ">
                      <h3 className="card-body col-12 nav-links">Materials</h3>
                      {course.materials ? 
                      <TouchableOpacity>
                        <Text
                          className="card-text col-12 "
                          style={{ color: "blue" }}
                          onPress={() => Linking.openURL(course.materials)}
                        >
                          Material Link
                        </Text>
                      </TouchableOpacity>
                      : <p className="text-danger">No Materials link available yet</p>
                      }

                      {/* {upload materials} */}

                      {is_staff || isAdmin || isCoordinator ? (
                        <div>
                          <form onSubmit={(event) => handleSubmit(event,"mat")}>
                            {/* <label className="text-primary">Material Link</label><br/> */}
                            {/* <input name="material-link" type="text" value={course.materials} onChange={(e) => onChange(e)}/> */}
                            {/* <br/> */}
                            <input
                              type="file"
                              multiple
                              onChange={(event) => handleChangeFile(event)}
                            />
                            <button type="submit" className="btn btn-success">
                              Upload Materials
                            </button>
                          </form>
                        </div>
                      ) : null}

                      {/* {download materials} */}

                      <button className="btn btn-lg col-12 button">
                        <a
                          className="button nav-links text-light"
                          onClick={() => handlePDFDownload("materials")}
                        >
                          Download
                        </a>
                      </button>
                    </div>

                    <div className="row card cards col-10 text-center border border-2 ">
                      <h3 className="card-body col-12 nav-links">Grades</h3>

                      {/* {upload grades} */}

                      {is_staff || isAdmin || isCoordinator ? (
                        <div>
                          <form onSubmit={(event) => handleSubmit(event,"grades")}>
                            <input
                              type="file"
                              multiple
                              onChange={(event) => handleChangeFile(event)}
                            />
                            <button type="submit" className="btn btn-success">
                              Upload Grades
                            </button>
                          </form>
                        </div>
                      ) : null}

                      {/* {download grades} */}
                      {course.stds_grades ? 
                      <div>
                        <button
                          className="btn btn-lg col-12 button"
                          onClick={() => handlePDFDownload("grades")}
                          >
                          <a className="button nav-links text-light">
                            Download Grades
                          </a>
                        </button>
                      </div>
                      :<p className="text-danger">No Grades uploaded yet</p>}
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
