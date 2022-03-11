import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import image from '../assets/image/new.jpg'

export default function GraduatePage(){

    const [AllNews, setAllNews] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/newsgraduate/"
          )
          .then((res) => setAllNews(res.data));
      }, []);
      function orderByOrderValue( a, b ) {
        if ( a.id > b.id ){
          return -1;
        }
        if ( a.id <b.id ){
          return 1;
        }
        return 0;
      }

        const imgEvent={
            height:'250px',
        }

      const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
        // background:'blue',
        
    };
    const start = {
        // color: 'red',
        // width: '50%',
        // height: '50%',
        marginTop:'150px',
        // background:'blue',
        
    };

    return(

        <>
        

        <section className="container">
                <div style={start} className="row d-flex justify-content-center">
                <h1 className="text-center fw-lighter text-light scroll"> Graduate News</h1>

                    {AllNews.sort(orderByOrderValue).map((item) => {
                        return (

                            <div className="col-5">
                            <div  class="card mb-4 border-light " key={item.id}  >
                              <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text text-dark fs-4">{item.description}</p>
                    
                              </div>
                              <img
                        class="card-img-bottom img-h"
                        src={item.picture}
                                alt="Card image cap"
                              />
                            </div>
                          </div>
                        );


                    })}

                </div>
                {/* <Link to='/' className="nav-link">
                    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >Return Home            </button>
                </Link> */}
                {/* <Link to='/coursegraduate' className="nav-link">
                    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} > Courses            </button>
                </Link> */}
            </section>

        </>
    )
}