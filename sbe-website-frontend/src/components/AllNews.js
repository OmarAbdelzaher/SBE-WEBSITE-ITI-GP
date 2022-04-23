import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllNews() {
  const [AllNews, setAllNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news/")
      .then((res) => setAllNews(res.data));
  }, []);

  const start = {
    marginTop: "150px",
  };
  function orderByOrderValue(a, b) {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <section className="container py-5">
        <div style={start} className="row">
          <h1 className="text-center fw-lighter text-light scroll">
            {" "}
            SBME NEWS
          </h1>
          {AllNews.sort(orderByOrderValue).map((item) => {
            return (
              <div className="col-md-4 ">
                <div className="card mb-4 border-light border-0" key={item.id}>
                  <div>
                    <img className="card-img-top img-h" src={item.picture} />
                  </div>
                  <div>
                    <div className="card-body ">
                      <h2 className="card-title">{item.title}</h2>

                      <p className="card-text text-dark fs-4 ">
                        {item.description}
                      </p>
                      <p className="card-text text-dark fw-bold ">
                        For : {item.category}
                      </p>
                    </div>
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
