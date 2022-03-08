import React from "react";
import EventData from "./EventData";
import image from '../assets/image/cardimg.jpg'
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";



export default function Events() {
    const [Events, setEvents] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/events/"
          )
          .then((res) => setEvents(res.data));
        //   console.log(res.data)
      }, []);
    
    const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
    };
    function orderByOrderValue( a, b ) {
        if ( a.id > b.id ){
          return -1;
        }
        if ( a.id <b.id ){
          return 1;
        }
        return 0;
      }

    return (
        <>


            <h1 id='allevents' className="mb-5 text-center">Events section </h1>

            <div className="container mt-2">
                <div className="row">
                    {Events.sort(orderByOrderValue).slice(0,3).map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 " key={item.id}>
                                    <h2>{item.name}</h2>
                                    <img src={image}  />
                                    <p>{item.details}</p>
                                    {/* <small>{item.date}</small> */}


                                </div>
                            </div>
                        );


                    })}

                </div>

            </div>
            <div class="row">
    <div class="col text-center">
    <Link to='/allevents' className="nav-link">
    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >
                More SBE Events
            </button>
            </Link>

    </div>
  </div>

        </>
    );
}


