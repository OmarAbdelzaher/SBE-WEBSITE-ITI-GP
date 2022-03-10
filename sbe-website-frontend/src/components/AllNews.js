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
        <section className="container">
            <div style={start} className="row">
             <h1 className="text-center fw-lighter text-light scroll"> SBE NEWS</h1>
              {AllNews.sort(orderByOrderValue).map((item) => {
                return (
                  <div className="col-md-4 ">
                    <div className="card mb-4 border-light" key={item.id}>
                        <div>
                        
                         <div className="card-body ">
                         <h2 className="card-title">{item.title}</h2>

                         <p className="card-text text-dark fs-4">{item.description}</p>
                         <p className="card-text text-dark fw-bold">For : {item.category}</p>
                         </div>
                         <div>
                           <img className="card-img-bottom img-h"  src={item.picture} />
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
