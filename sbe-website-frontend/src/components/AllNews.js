import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-dom";

export default function AllNews() {
  const [AllNews, setAllNews] = useState([]);
  // const params = useParams();

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
      <section className="container">
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
                      
                        <Link className="table-b" to={`/new/${item.id}`}>
                        <span>
                          <p className="card-text text-dark fs-4 ">
                            {item.description.slice(0, 25)}

                            <TouchableOpacity>
                              <Text
                                className="card-text "
                                style={{
                                  color: "#03045e",
                                  fontSize: "18px",
                                }}
                                // onPress={() =>
                                //   Linking.openURL('new')
                                // }
                              >...Read more
                              </Text>
                            </TouchableOpacity>
                          </p>
                          </span>
                        </Link>
                      
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
