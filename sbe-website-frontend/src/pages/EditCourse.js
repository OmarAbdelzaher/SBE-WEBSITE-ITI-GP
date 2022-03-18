import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

let listing = [];
export default function EditCourse() {
  const params = useParams();
  const who = useSelector((state) => state.auth);

  let Url = `http://localhost:8000/api/course/${params.id}`;
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState();

    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/course/${params.id}`)
        .then((res) => {setData(res.data.materials)
          console.log(res.data);
          // console.log(res.data.materials);
    });
   
    }, []);
       
    console.log( params.staff_id)

  const [formData, setFormData] = useState({
    name: params.name,
    total_grade: params.total_grade,

    instructions: params.instructions,
    materials:data,

    staff_id: [params.staff_id] ,
    category: params.category,
    year: params.year,
    semester: params.semester,
  });
 
  console.log(formData.staff_id)
  console.log(formData.staff_id[0])
  console.log(params.staff_id.split(','))

  const arr = params.staff_id.split(',')
  var newstaff = arr.filter(Number).map(c => Number(c));
  console.log(newstaff);


  
  if(who.user == null)
  {
    return <Redirect to="/" />;
  }  
  if (who.user != null )
  {
    if (who.user.is_coordinator == false  && who.user.is_admin == false )
    {
      return <Redirect to="/" />;  
    }
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.total_grade) {
      errors.total_grade = "Total Grade is required";
    }
    if (!values.instructions) {
      errors.instructions = "Instructions is required";
    }
    // if (!values.category) {
    //   errors.category = "Category is required";
    // }
    if (!values.year) {
      errors.year = "Year is required";
    }
    if (!values.semester) {
      errors.semester = "Semester is required";
    }

    return errors;
  };


  const onSubmit = (e) => {
    e.preventDefault();
    // changeSelectedNames(e)
    let errors_form = validate(formData);
    setFormErrors(validate(formData));

    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();

      Data.append("name", formData.name);
      Data.append("total_grade", formData.total_grade);
      Data.append("instructions", formData.instructions);
      Data.append("materials", formData.materials);

      newstaff.forEach((element) => {
        console.log(element);
        Data.append("staff_id", element);
      });    
      Data.append("category", formData.category);
      Data.append("year", formData.year);
      Data.append("semester", formData.semester);

      axios
        .put(Url, Data)
        .then((res) => {
          history.push("/coursesMenu");
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
    }
  };

  return (
    <>
      <section>
        <section className="h-150 h-custom">
          <div className="container py-5 h-150">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3 courses-b ">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Edit Course
                    </h3>
                    <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">{formErrors.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="description" className="form-label">
                              Total Grade
                            </label>
                            <br />
                            <input
                              type="number"
                              className="form-control form-control-lg"
                              id="total_grade"
                              name="total_grade"
                              value={formData.total_grade}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">
                              {formErrors.total_grade}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label
                              htmlFor="instructions"
                              className="form-label"
                            >
                              Instructions
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="instructions"
                              name="instructions"
                              value={formData.instructions}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">
                              {formErrors.instructions}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="materials" className="form-label">
                               Material Link
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="materials"
                              name="materials"
                              value={formData.materials}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="category" className="form-label">
                              Category
                            </label>
                            <br />

                            <select
                              id="category"
                              className="select form-control-lg"
                              value={formData.category}
                              onChange={(e) => onChange(e)}
                              name="category"
                            >
                              <option value="0">Choose Gategory</option>

                              <option value="graduate">Graduate</option>
                              <option value="undergraduate">
                                Undergraduate
                              </option>
                            </select>

                            <p className="text-danger">{formErrors.category}</p>
                          </div>
                        </div>
                      </div> */}

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="year" className="form-label">
                              Year
                            </label>
                            <br />

                            <select
                              className="select form-control-lg"
                              onChange={(e) => onChange(e)}
                              name="year"
                              value={formData.year}
                            >
                              <option value="0" selected>
                                Choose Year
                              </option>
                              <option value="Year 1">Year 1</option>
                              <option value="Year 2">Year 2</option>
                              <option value="Year 3">Year 3</option>
                              <option value="Year 4">Year 4</option>
                            </select>
                            <p className="text-danger">{formErrors.year}</p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="" className="form-label">
                              Semester
                            </label>
                            <br />

                            <select
                              className="select form-control-lg"
                              onChange={(e) => onChange(e)}
                              name="semester"
                              value={formData.semester}
                            >
                              <option value="0" selected>
                                Choose Semester
                              </option>
                              <option value="one">Semester 1</option>
                              <option value="two">Semester 2</option>
                            </select>
                            <p className="text-danger">{formErrors.semester}</p>
                          </div>
                        </div>
                      </div>

            
                      <br />
                      <button type="submit" className="btn button btn-lg mb-1">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
