import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import image from '../assets/image/new.jpg'

export default function UnderGraduate(){

    const [AllNews, setAllNews] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/newsundergraduate/"
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
         {/* <Header/> */}
         <br className="mt-5"></br>

<div style={start} >
        {/* <h1> Hello graduate page</h1> */}


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
                                src={image}
                                alt="Card image cap"
                                style={imgEvent}
                              />
                            </div>
                          </div>
                        );


                    })}

                </div>
                <Link to='/' className="nav-link">
                    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >Return Home            </button>
                </Link>
            </div>

        </div>
        </>
    )
}