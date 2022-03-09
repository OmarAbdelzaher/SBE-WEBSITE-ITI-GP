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
  useEffect(() => {
    axios.get(`http://localhost:8000/api/course/${params.id}`).then((res) => {
      setCourse(res.data);
    });
  }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/course/${params.id}`,
  //       {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json",

  //           'Authorization': 'Bearer ' + window.localStorage["Access_Token"]},
  //       }).then(response => console.log(response.blob())).then(response =>console.log(response.data.stds_grades) )

  //   }, []);

  // const download=()=>{
  //     axios({
  //       url: (`http://localhost:8000/api/course/${params.id}/${course.stds_grades}`), //your url
  //       method: 'GET',
  //       headers: {
  //         'Access-Control-Allow-Origin' :  '*' ,
  //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //         'Access-Control-Allow-Credentials': 'true',
  //         'Content-Type': 'application/octet-stream',
  //         'Content-Disposition': 'attachment',
  //         // 'filename':"picture.png",

  //         },
  //       responseType: 'blob', // important

  //   }).then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', 'file.jpg'); //or any other extension
  //       document.body.appendChild(link);
  //       link.click();
  //   });
  // }

  // const downloadFile = () => {
  //   window.location.href = "../../../media/student_grades/Dj_Proj_Specs_-_ITP_-_Python_-_Minya.pdf"
  // }
  //  apiUrl='https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg'

  const handleChangeFile = (e) => {
        // for (let i = 0; i < file.length; i++) { 
      //   formData.append(`stds_grades[${i}]`,file
                        
      //   );
      // }

  
    // const file = e.target.files[0];

    const list=[]
    const files = e.target.files;

      for (let i = 0; i < files.length; i++) {
      list.push(files[i])
      console.log(list.name)
      console.log(list)

    }
    //  function onSelectedFiles(e){

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

    console.log(list)

    console.log('updated list ' ,list)
    let formData = new FormData();
    console.log(e.target.files)

  
    formData.append("stds_grades", files);
    formData.append("name", course.name);
    files.forEach((element)=>{
      formData.append("total_grade",element);

    })
    formData.append("total_grade", course.total_grade);
    formData.append("instructions", course.instructions);
    formData.append("materials", course.materials);
    formData.append("staff_id", who.user.id);
    formData.append("category", course.category);
    formData.append("year", course.year);
    formData.append("semester", course.semester);

    console.log(formData);
    //Make a request to server and send formData
    axios.put(`http://localhost:8000/api/course/${params.id}`, formData);
  };

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

                      {/* <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://google.com')}>
  Google
</Text> */}
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

                      {/* <p className="card-text col-12 text-dark">{course.stds_grades}</p> */}

                      <div>
                        <input
                          type="file"
                          multiple
                          onChange={(event) => handleChangeFile(event)}

                        />
                        {/* <button className="btn " type="submit" onClick={onSelectedFiles} >
                                  Submit
                        </button> */}
                        <p></p>
                      </div>
                      <div>
                        {/* <div>
       <button
          onClick={() => handlePDFDownload()}>Download File!
       </button>
    </div> */}
                        <button
                          className="btn btn-lg col-12 button"
                          onClick={() => handlePDFDownload()}
                        >
                          <a className="button nav-links text-light">
                            Download Grades
                          </a>
                        </button>
                        {/* <button onClick={saveFile}>download</button> */}
                      </div>
                      {/* <a href={require("../path/to/file.pdf")} download="myFile">Download file</a> */}

                      {/* <a
        href={course.stds_grades}
        download
      >Click Here tp downloaddddddd</a> */}
                      {/* <button className="btn btn-lg col-12 button" onClick={getFileToDownload}  >click */}
                      {/* <a className="button nav-links text-light" href={course.stds_grades} download>Download</a> */}
                      {/* </button> */}
                    </div>
                    {/* <div className="row card cards col-10 text-center border border-2 ">
                    <h3 className="card-body col-12 nav-links">Schedule</h3>
                    <p className="card-text col-12 text-dark">Download Course Schedule</p>
                    <button className="btn btn-lg col-12 button">
                      <a className="button nav-links text-light" href={course.schedule} download>Download</a>
                    </button>
                  </div> */}
                  </div>
                </div>

                {/* <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Course Materials</h2>
                  <p className="col-4">{course.materials}</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.materials} download>Download</a>
                    </button>
                </div>
                <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Students Grades</h2>
                  <p className="col-4">Download Students Grades</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.stds_grades} download>Download</a>
                    </button>
                </div>
                <div className="row justify-content-center align-items-center ">
                  <h2 className="bg-light py-3 nav-links">Students Grades</h2>
                  <p className="col-4">Download Course Schedule</p>
                  <button className="btn btn-lg col-6 button">
                      <a className="button nav-links text-light" href={course.schedule} download>Download</a>
                    </button>
                </div> */}
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
