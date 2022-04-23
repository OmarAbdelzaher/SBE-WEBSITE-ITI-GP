import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Linking, Text, TouchableOpacity } from "react-native";


export default function Events() {
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events/")
      .then((res) => setEvents(res.data));
    //   console.log(res.data)
  }, []);

  const btnStyle = {
    color: "white",
    width: "50%",
    height: "50%",
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

      <section id='allevents'  className="events-section">
        <h1 className="text-center text-light">SBME EVENTS</h1>
 
        <div className="container">
          <div className="row">
            {Events.sort(orderByOrderValue)
              .slice(0, 4)
              .map((item) => {
                return (
                  
                  <div className="col-3 ">
                  <div className="card cardItem">
                    <div className="card-hight row">
                      <div className="col-12 ">
                        <img src={item.picture} className="img-h card-img-top " />
                      </div>
                      <div className=" col-12 ">
                        <div className="card-body " key={item.id}>
                          <h2 className="card-title">{item.name}</h2>
                          {/* <p className="card-text text-dark">
                          <FontAwesomeIcon
                                  className="fs-6"
                                  icon={faCalendarDays}
                                />{" "}
                            {item.details.slice(0, 25)}
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
                            </p> */}
                           
                      
                          <p className="card-text text-dark fs-4 ">
                          <FontAwesomeIcon
                                  className="fs-6"
                                  icon={faCalendarDays}
                                />{" "}
                            {item.details.slice(0, 19)}

                            <Link className="table-b" to={`/event/${item.id}`}>
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
                            </Link>
                          </p>
                         
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  
                );
              })}
          </div>
        </div>

        <div class="justify-content-center align-items-center d-flex">
          <Link to="/allevents" className="btn button">
            <button className="ani button fs-2">More Events 
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
