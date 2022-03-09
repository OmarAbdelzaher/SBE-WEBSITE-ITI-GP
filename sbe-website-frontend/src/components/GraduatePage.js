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
         <br className="mt-5"></br>
         <br className="mt-5"></br>

<ul className="nav nav-tabs" style={start}>
        <li className="nav-item ">
          <a className="nav-link active" aria-current="page" href="/graduatepage">News</a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-links" href="/coursegraduate">Courses</a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-links" href="#">Office Hours </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
        </li> */}
      </ul>


{/* <div style={start} > */}
        {/* <h1> Hello graduate page</h1> */}
<div>

        <div className="container-fluid mt-2">
                <div className="row">
                    {AllNews.sort(orderByOrderValue).map((item) => {
                        return (

                            <div className="col-md-9 col-sm-12">
                            <div  class="card " key={item.id}  >
                              <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.description}</p>
                                {/* <h3>{item.category}</h3> */}
                                {/* <p class="card-text">
                                  <small class="text-muted">Last updated 3 mins ago</small>
                                </p> */}
                              </div>
                              <img
                                class="card-img-bottom"
                                src={item.picture}
                                alt="Card image cap"
                                style={imgEvent}
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
            </div>

        </div>
        </>
    )
}