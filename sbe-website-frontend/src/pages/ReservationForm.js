import React from "react";
import Header from "../components/header";

const ReservationForm = () => {
    return (
      <>
        <section className="h-150 h-custom">
        <div className="container py-5 h-150">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 form">
                <img src="http://ihd.eng.cu.edu.eg/wp-content/uploads/sites/13/2014/12/Fac_eng_minified-620x279.jpg" className="w-100" style={{borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem'}} alt="Sample photo" />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Reservation Form</h3>
                  <form className="px-md-2">
                    <div className="row">
          <div className="col-md-12 mb-4 d-flex align-items-center">
            <div className="form-outline datepi+cker w-100">
              <input type="date" className="form-control form-control-lg" id="ReservationDate" />
              <label htmlFor="ReservationDate" className="form-label">Reservation Date</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4 d-flex align-items-center">
            <div className="form-outline datepi+cker w-100">
              <input type="time" className="form-control form-control-lg" id="ReservationTime" />
              <label htmlFor="ReservationTime" className="form-label">Reservation Time</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className="form-label select-label">Reservation Type</label>
            <select className="select form-control-lg">
              <option value={1} disabled>Reservation Type</option>
              <option value={2}>Hall</option>
              <option value={3}>Lab</option>
              <option value={4}>Device</option>
            </select>
          </div>
        </div>
        <br></br>
        <div className="col-md-12 mb-4 pb-2">
            <div className="form-outline">
              <input type="text" id="ReservationName<" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="ReservationName<">Reservation Name</label>
            </div>
          </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
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
export default ReservationForm;