import React from "react";
import "./Academics.css";

export default function Academics() {
  return (
    <>
      <section className="academic-section"></section>
      <h1 className="text-center">Academics</h1>

      <div className="container">
        {/* Card deck */}
        <div className="card-deck row">
          <div className="col-xs-12 col-sm-6 col-md-6">
            {/* Card */}
            <div className="card mb-4 cardimg">
              {/*Card image*/}
              <div className="view overlay">
                <img
                  className="card-img-top imgcard"
                  src="https://lv7ms1pq6dm2sea8j1mrajzw-wpengine.netdna-ssl.com/wp-content/uploads/2014/05/shutterstock_789412672-1200x675.jpg"
                  alt="graduate-img"
                />
                <a href="#!">
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              {/*Card content*/}
              <div className="card-body h-100">
                {/*Title*/}
                <h4 className="card-title">Graduate</h4>
                {/*Text*/}
                <p className="card-text text-dark">
                Opportunities to participate in the advancement of entire fields of knowledge
                </p>
              </div>
            </div>
            {/* Card */}
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6">
            {/* Card */}
            <div className="card mb-4 cardimg ">
              {/*Card image*/}
              <div className="view overlay">
                <img
                  className="card-img-top imgcard"
                  src="https://imageio.forbes.com/specials-images/imageserve/5e020def4e2917000783d582/0x0.jpg?format=jpg&width=1200&fit=bounds"
                  alt="undergraduate-img"
                />
                <a href="#!">
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              {/*Card content*/}
              <div className="card-body ">
                {/*Title*/}
                <h4 className="card-title">Undergraduate</h4>
                {/*Text*/}
                <p className="card-text text-dark">
                Rich learning experiences that provide a broad  foundation and deep expertise
                </p>
              </div>
            </div>
            {/* Card */}
          </div>
        </div>
        {/* Card deck */}
      </div>
    </>
  );
}
