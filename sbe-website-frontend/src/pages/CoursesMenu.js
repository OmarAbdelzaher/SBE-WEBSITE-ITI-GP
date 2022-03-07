import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CoursesMenu() {
  const [formData, setFormData] = useState({
    // ReserveDate: "",
    // ReserveTime: "",
    Year: "year",
    Semester: "semester",
    // reserveHalls:"",
    // reserveLabs:"",
    // reserveDevices:""
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section className="h-150 h-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-8 col-xl-6">
              <div className=" rounded-3 form">
                <div className=" p-4 p-md-5 courses-b border border-2 border-light">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 ">
                    Students Courses
                  </h3>
                  <form className="px-md-2">
                    <div className="row">
                      <div className="col-12">
                        <label className="form-label select-label col-12 fs-5 ">
                          Study Year
                        </label>{" "}
                        <select
                          className="select form-control-lg col-12 "
                          onChange={(e) => onChange(e)}
                          name="Year"
                          value={formData.Year}
                        >
                          <option value="0">Please select Your Year</option>
                          <option value="1">First Year</option>
                          <option value="2">Second Year</option>
                          <option value="3">Third Year</option>
                          <option value="4">Fourth Year</option>
                        </select>
                        {formData.Year == "1" ? (
                          <>
                            <br />
                            <div>
                              <div>
                                <br></br>
                                <div className="row">
                                  <div className="col-12">
                                    <label className="form-label select-label col-12 fs-5">
                                      Semester
                                    </label>
                                    <select
                                      className="select form-control-lg col-12"
                                      name="Semester"
                                      value={formData.Semester}
                                      onChange={(e) => onChange(e)}
                                    >
                                      <option value="0"> Please select Your Term </option>
                                        
                                     

                                      <option value="first">First Term</option>
                                      <option value="second">Second Term</option>
                                    </select>
                                    {formData.Semester == "first" ? (
                                      <>
                                        <label htmlFor="first">
                                          You choose year 1 Semester 1{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/one-smesterone"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                    {formData.Semester == "second" ? (
                                      <>
                                        <label htmlFor="second">
                                          You choose year 1 Semester 2{" "}
                                        </label>
                                        <Link
                                          className="button btn btn-lg col-12"
                                          to="/one-smestertwo"
                                        >
                                          <button
                                            type="submit"
                                            className="button ani  mb-1"
                                          >
                                            Show Courses
                                          </button>
                                        </Link>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                                <br></br>
                      
                              </div>
                            </div>
                          </>
                        ) : null}
                        {/* Year two Selection */}
                        {formData.Year == "2" ? (
                           <>
                           <br />
                           <div>
                             <div>
                               <br></br>
                               <div className="row">
                                 <div className="col-12">
                                   <label className="form-label select-label col-12 fs-5">
                                     Semester
                                   </label>
                                   <select
                                     className="select form-control-lg col-12"
                                     name="Semester"
                                     value={formData.Semester}

                                     onChange={(e) => onChange(e)}
                                   >
                                     <option value="0">
                                       Please select Your Term
                                     </option>

                                     <option value="first">First Term</option>
                                     <option value="second">
                                       Second Term
                                     </option>
                                   </select>
                                   {formData.Semester == "first" ? (
                                     <>
                                       <label htmlFor="first">
                                         You choose year 2 Semester 1{" "}
                                       </label>
                                       <Link
                                         className="button btn btn-lg col-12"
                                         to="/two-smesterone"
                                       >
                                         <button
                                           type="submit"
                                           className="button ani  mb-1"
                                         >
                                           Show Courses
                                         </button>
                                       </Link>
                                     </>
                                   ) : null}
                                   {formData.Semester == "second" ? (
                                     <>
                                       <label htmlFor="second">
                                         You choose year 2 Semester 2{" "}
                                       </label>
                                       <Link
                                         className="button btn btn-lg col-12"
                                         to="/two-smestertwo"
                                       >
                                         <button
                                           type="submit"
                                           className="button ani  mb-1"
                                         >
                                           Show Courses
                                         </button>
                                       </Link>
                                     </>
                                   ) : null}
                                 </div>
                               </div>
                               <br></br>
                     
                             </div>
                           </div>
                         </>
                        ) : null}
                        {formData.Year == "3" ? (
                          <>
                          <br />
                          <div>
                            <div>
                              <br></br>
                              <div className="row">
                                <div className="col-12">
                                  <label className="form-label select-label col-12 fs-5">
                                    Semester
                                  </label>
                                  <select
                                    className="select form-control-lg col-12"
                                    name="Semester"
                                    onChange={(e) => onChange(e)}
                                  >
                                    <option value="0">
                                      Please select Your Term
                                    </option>

                                    <option value="first">First Term</option>
                                    <option value="second">
                                      Second Term
                                    </option>
                                  </select>
                                  {formData.Semester == "first" ? (
                                    <>
                                      <label htmlFor="1">
                                        You choose year 3 Semester 1{" "}
                                      </label>
                                      <Link
                                        className="button btn btn-lg col-12"
                                        to="/three-smesterone"
                                      >
                                        <button
                                          type="submit"
                                          className="button ani  mb-1"
                                        >
                                          Show Courses
                                        </button>
                                      </Link>
                                    </>
                                  ) : null}
                                  {formData.Semester == "second" ? (
                                    <>
                                      <label htmlFor="1">
                                        You choose year 3 Semester 2{" "}
                                      </label>
                                      <Link
                                        className="button btn btn-lg col-12"
                                        to="/three-smestertwo"
                                      >
                                        <button
                                          type="submit"
                                          className="button ani  mb-1"
                                        >
                                          Show Courses
                                        </button>
                                      </Link>
                                    </>
                                  ) : null}

      
                                </div>
                              </div>
                              <br></br>
                    
                            </div>
                          </div>
                        </>
                        ) : null}

{formData.Year == "4" ? (
                           <>
                           <br />
                           <div>
                             <div>
                               <br></br>
                               <div className="row">
                                 <div className="col-12">
                                   <label className="form-label select-label col-12 fs-5">
                                     Semester
                                   </label>
                                   <select
                                     className="select form-control-lg col-12"
                                     name="Semester"
                                     onChange={(e) => onChange(e)}
                                   >
                                     <option value="0">
                                       Please select Your Term
                                     </option>

                                     <option value="first">First Term</option>
                                     <option value="second">
                                       Second Term
                                     </option>
                                   </select>
                                   {formData.Semester == "first" ? (
                                     <>
                                       <label htmlFor="1">
                                         You choose year 4 Semester 1{" "}
                                       </label>
                                       <Link
                                         className="button btn btn-lg col-12"
                                         to="/one-smesterone"
                                       >
                                         <button
                                           type="submit"
                                           className="button ani  mb-1"
                                         >
                                           Show Courses
                                         </button>
                                       </Link>
                                     </>
                                   ) : null}
                                   {formData.Semester == "second" ? (
                                     <>
                                       <label htmlFor="1">
                                         You choose year 4 Semester 2{" "}
                                       </label>
                                       <Link
                                         className="button btn btn-lg col-12"
                                         to="/one-smestertwo"
                                       >
                                         <button
                                         
                                           className="button ani  mb-1"
                                         >
                                           Show Courses
                                         </button>
                                       </Link>
                                     </>
                                   ) : null}
                                 </div>
                               </div>
                               <br></br>
                     
                             </div>
                           </div>
                         </>
                        ) : null}
                      </div>
                    </div>
                    {/* <br></br>
                    <div className="row">
                      <div className="col-12">
                      <label className="form-label select-label col-12 fs-5">Semester</label>
                        <select className="select form-control-lg col-12">
                          <option value={2}>First Term</option>
                          <option value={3}>Second Term</option>
                        </select>
                      </div>
                    </div>
                    <br></br> */}
                    <div className="row">
                      {/* <Link className='button btn btn-lg col-12' to="/coursesPage">
                    <button type="submit" className="button ani  mb-1">Show Courses</button>
                    </Link> */}
                      <Link className="button btn btn-lg col-12">
                        <button type="submit" className="button ani mb-1">
                          Show Schedule
                        </button>
                      </Link>
                    </div>
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

export default CoursesMenu;
