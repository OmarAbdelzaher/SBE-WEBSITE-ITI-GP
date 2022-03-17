import React from "react";
import "./cards.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function News() {
  const [News, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news/")
      .then((res) => setNews(res.data));
  }, []);

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
    // background:'blue',
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
      <section id="allnews" className="news-section">
        <h1 className=" text-center">SBME NEWS </h1>

        <div className="container ">
          <div className="row">
            {News.sort(orderByOrderValue)
              .slice(0, 3)
              .map((item) => {
                return (
                  <div className="col-md-4 card-group  ">
                    <div className="card border shadow-lg rounded">
                      <div className="row ">
                        <div className="col-12">
                          <img src={item.picture} className="img-h card-img-top border"/>
                        </div>

                        <div className="col-12">
                          <div
                            className="card-body mb-4 "
                            key={item.id}
                          >
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-text text-dark">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="py-2 justify-content-center align-items-center d-flex">
          <Link to="/allnews" className="btn btn-lg button">
            <button className="ani button">More News</button>
          </Link>
        </div>
      </section>
    </>
  );
}
