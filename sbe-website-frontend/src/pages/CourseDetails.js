import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Linking } from 'react-native';
import { Linking, Text, StyleSheet, TouchableOpacity } from "react-native";
// import FileSaver from 'file-saver';
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

function CourseDetails() {
  const who = useSelector((state) => state.auth);

  const params = useParams();
  const [course, setCourse] = useState({});
  const [filesList, setFilesList] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/course/${params.id}`).then((res) => {
      setCourse(res.data);
    });
  }, []);

  const handleChangeFile = (e) => {
    const list = [];

    const files = e.target.files;
    // console.log(e.target.files);

    for (let i = 0; i < files.length; i++) {
      list.push(files[i]);
    }
    // console.log(list);
    //  function onSelectedFiles(e){
    setFilesList(list)
    // for (let i = 0; i < list.length; i++){
    // if(list.find((selected)=> selected.name!==i.name)){
    // list.push(list[i])
    // console.log(files)
    // }
    // else{
    //   console.log(files)
    // }

    // }
    // }

    

    // console.log(course.name);
    // handleSubmit(formData)
  };
  
  const handleSubmit = () => {

    let formData = new FormData();

    console.log(filesList);

    filesList.forEach((element) => {
      formData.append("stds_grades", element);
    });
    formData.append("name", course.name);
    formData.append("total_grade", course.total_grade);
    formData.append("instructions", course.instructions);
    formData.append("materials", course.materials);
    formData.append("staff_id", who.user.id);
    formData.append("category", course.category);
    formData.append("year", course.year);
    formData.append("semester", course.semester);

    axios.put(`http://localhost:8000/api/course/${params.id}`, formData).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  }
  // const saveFile = () => {
  //   saveAs(
  //     `http://localhost:8000/api/course/${params.id}`,
  //     `${course.stds_grades}`
  //   );

  // };

  var fileDownload = require("js-file-download");

  function basename(path) {
    return path.split("/").reverse()[0];
  }
  const handlePDFDownload = () => {
    axios
      .get(`http://localhost:8000/api/download/${course.id}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, basename(course.stds_grades));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
                      <TouchableOpacity>
                        <Text
                          className="card-text col-12 "
                          style={{ color: "blue" }}
                          onPress={() => Linking.openURL(course.materials)}
                        >
                          Go To Material
                        </Text>
                      </TouchableOpacity>

                      <button className="btn btn-lg col-12 button">
                        <a
                          className="button nav-links text-light"
                          href={course.materials}
                        >
                          Download
                        </a>
                      </button>
                    </div>
                    <div className="row card cards col-10 text-center border border-2 ">
                      <h3 className="card-body col-12 nav-links">Grades</h3>
                      <p className="card-text col-12 text-dark">
                        Download Students Grades
                      </p>

                      <div>
                        <form onSubmit={(event) => handleSubmit(event)}>
                        <input
                          type="file"
                          multiple
                          onChange={(event) => handleChangeFile(event)}
                        />
                        <button type="submit" className="btn btn-success"></button>
                        </form>

                        <p></p>
                      </div>
                      <div>
                        <button
                          className="btn btn-lg col-12 button"
                          onClick={() => handlePDFDownload()}
                        >
                          <a className="button nav-links text-light">
                            Download Grades
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseDetails;
