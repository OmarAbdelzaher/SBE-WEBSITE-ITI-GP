import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

export default function OneEvent() {
  const [Event, setEvent] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/event/${params.id}`)
      .then((res) => setEvent(res.data));
  }, []);

  const start = {
    marginTop: "150px",
  };
  const imgEvent = {
    height: "250px",
  };

  return (
    <>
      <section className="container">
        <div
          style={start}
          className="row d-flex justify-content-center align-items-center"
        >
          <h1 className="text-center fw-lighter text-light scroll">
            {Event.name}{" "}
          </h1>

          <div className="col-12">
            <div class="card mb-4 cards cardItem" key={Event.id}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    class="img-fluid rounded-start"
                    src={Event.picture}
                    alt="Card image cap"
                    style={imgEvent}
                  />
                </div>
                <div className="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{Event.name}</h5>
                    <p class="card-text text-dark">{Event.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="justify-content-center align-items-center d-flex">
          <Link to="/allevents" className="btn button">
            <button className="ani button fs-2"> Back 
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
