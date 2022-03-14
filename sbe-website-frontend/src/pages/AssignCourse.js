import React  from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// select-react import
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function AssignCourse() {
  const params = useParams();
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const [doctors, setDoctors] = useState([]);
  const [courses, setCourse] = useState([]);

  // const [staffList, setstaffList] = useState([]);

  const url = `http://localhost:8000/api/course/${params.id}`;
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/course/${params.id}`)
      .then((res) => setData(res.data));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/course/${params.id}`)
      .then((res) => setCourse(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/staff/")

      .then((res) => setDoctors(res.data));
  }, []);


  const nameoptions = [];
  doctors.map((tag) =>
    nameoptions.push({ value: tag.id, label: `${tag.fname} ${tag.lname}` })
  );
  // const oldvalues = [];
  // courses.map((course) =>
  //   oldvalues.push({ value: course.id, label: `${course.staff_id} ` })
  // );
// console.log(oldvalues)
  const [data, setData] = useState({
    coursename: params.name,
    totalgrade: "",

    // stds_grades:'' ,
    instructions: params.instructions,
    materials: params.materials,
    year: params.year,
    semester: params.semester,
    staff:'',
    // staffold: courses.staff_id,
    category: params.category,
  });

  // function handle(e) {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // ;
  // }
  // select Name
  const changeSelectedNames = (e) => {
    console.log(Object.values(e));
    // let oldstaff=courses.staff_id
    // console.log(oldstaff);

    // let old=[];
    // for (let o of oldstaff){
    //   old.push(parseInt(o.value));
    // }
    // let oldvalues = courses.staff_id

    // console.log(oldvalues);

    let List_names = Object.values(e);

    let chosen = [];
    for (let t of List_names) {
      chosen.push(parseInt(t.value));
    }
    console.log(chosen);

    // for (let t of oldvalues) {
    //   chosen.push(parseInt(t.value));
    // }
    console.log(chosen);
    setData({
      ...data,
      staff: chosen,
      
    });
  };

  // const oldstaff = (e) => {
  //   console.log(Object.values(e));

  //   let List_names = Object.values(e);
  //   let old = [];
  //   for (let t of List_names) {
  //     old.push(parseInt(t.value));
  //   }
  //   setData({
  //     ...data,
  //     staffold: old,
      
  //   });
  // };
  const validate = (values) => {
    const errors = {};
    if (!values.staff_id) {
      errors.staff_id = "Staff Name is Required";
    }

    return errors;
  };

  function onSubmit(e) {
    // oldstaff(e)
    e.preventDefault();
    console.log(params);
    let errors_form = validate(data);

    setFormErrors(errors_form);
    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();


      // Data.append("staff_id", data.staffold);

      data.staff.forEach((element) => {
        Data.append("staff_id", element);
      });


      Data.append("name", courses.name);
      Data.append("total_grade", courses.total_grade);
      Data.append("instructions", courses.instructions);
      Data.append("materials", courses.materials);
      Data.append("year", courses.year);
      Data.append("semester", courses.semester);
      Data.append("category", courses.category);
      console.log(data);

      axios
        .put(url, Data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);

          history.push(`/courseDetails/${params.id}`);
        })
        .catch((e) => console.log(e));
    }
  }

  return (
    <>
      <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 courses-b ">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Assign Course
                  </h3>
                  <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <h2
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Course Name
                          </h2>
                          <h4>{courses.name}</h4>

                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <h2
                            htmlFor="ReservationDate"
                            className="form-label"
                          >
                            Current Staff
                          </h2>
   
                          <h5>{`${courses.staff_id }`}  {" "}</h5>

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-4 d-flex align-items-center">
                        <div className="form-outline datepi+cker w-100">
                          <label
                            htmlFor="staff"
                            className="form-label"
                          >
                            Staff Name
                          </label>
                          <br />
                          <Select
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder={'Choose Staff Names'}
                      isMulti
                      options={nameoptions}
                      onChange={(e) => changeSelectedNames(e)}
                      name="staff"
                      // value={data.staff}
                      //  defaultValue={data.staff}

                      className="text-dark"
                      // value={parseInt(courses.staff_id)}
                      isSearchable
                      setValue
                    />
                    <p className="text-danger">{formErrors.staff}</p>
                    <br />
                    
                          <br />
                        </div>
                      </div>
                    </div>
   
                 
    
                    <button type="submit" className="btn button btn-lg mb-1">
                      Submit
                    </button>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
