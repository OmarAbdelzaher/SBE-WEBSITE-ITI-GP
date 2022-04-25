import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Linking, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-dom";


export default function AllEvents() {
  const [AllEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events/")
      .then((res) => setAllEvents(res.data));
  }, []);

  // Full function for readability
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
  const start = {
    marginTop: "150px",
  };

  return (
    <>
      <section className="container">
        <div
          style={start}
          className="row d-flex justify-content-center align-items-center"
        >
          <h1 className="text-center fw-lighter text-light scroll">
            SBME EVENTS
          </h1>

          {AllEvents.sort(orderByOrderValue).map((item) => {
            return (
              <div className="col-10 ">
                <div class="card mb-4 cards cardItem" key={item.id}>
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        class="img-fluid rounded-start"
                        src={item.picture}
                        alt="Card image cap"
                        style={imgEvent}
                      />
                    </div>
                    <div className="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        {/* <p class="card-text text-dark">
                          <FontAwesomeIcon
                            className="fs-6"
                            icon={faCalendarDays}
                          />{" "}
                          {item.details}
                        </p> */}
                        <Link className="table-b" to={`/event/${item.id}`}>
                          <p className="card-text text-dark fs-4 ">
                          <FontAwesomeIcon
                            className="fs-6"
                            icon={faCalendarDays}
                          />{" "}
                            {item.details.slice(0, 10)}
                            {/* <span> */}

                            <TouchableOpacity>
                              <Text
                                className="card-text "
                                style={{
                                  color: "#03045e",
                                  fontSize: "18px",
                                  display:"inline-block",
                                }}
                                // onPress={() =>
                                //   Linking.openURL('new')
                                // }
                              >...Read more
                              </Text>
                            </TouchableOpacity>
                            {/* </span> */}
                          </p>
                          
                        </Link>
                      </div>
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
