import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GraduatePage() {
  const [AllNews, setAllNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/newsgraduate/")
      .then((res) => setAllNews(res.data));
  }, []);
  function orderByOrderValue(a, b) {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  }

  const imgEvent = {
    height: "250px",
  };

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
    // background:'blue',
  };
  const start = {
    // color: 'red',
    // width: '50%',
    // height: '50%',
    marginTop: "150px",
    // background:'blue',
  };

  return (
    <>
      <section className="container py-5">
        <div style={start} className="row ">
          <h1 className="text-center fw-lighter text-light scroll">
            {" "}
            Graduate News
          </h1>

          {AllNews.sort(orderByOrderValue).map((item) => {
            return (
              <div className="col-4">
                <div class="card mb-4 border-0 " key={item.id}>
                  <img
                    class="card-img-top img-h"
                    src={item.picture}
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text text-dark fs-4">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
