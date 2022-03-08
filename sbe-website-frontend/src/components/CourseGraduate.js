import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import image from '../assets/image/new.jpg'

export default function CourseGraduate(){

    const [graduatecourse, setGraduateCourse] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/coursegraduate/"
          )
          .then((res) => setGraduateCourse(res.data));
      }, []);


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

<div style={start} >
        {/* <h1> Hello graduate page</h1> */}


        <div className="container-fluid mt-2">
                <div className="row">
                    {graduatecourse.map((item) => {
                        return (

                            <div className="col-md-9 col-sm-12">
                            <div  class="card " key={item.id}  >
                              <div class="card-body">
                                <h5 class="card-title">{item.name}</h5>
                                <p class="card-text">Category:{item.category}</p>
                                <p class="card-text">Staff ID:{item.staff_id}</p>
                                <p class="card-text">instructions:{item.instructions}</p>



                                {/* <h3>{item.category}</h3> */}
                                {/* <p class="card-text">
                                  <small class="text-muted">Last updated 3 mins ago</small>
                                </p> */}
                              </div>
                              {/* <img
                                class="card-img-bottom"
                                src={image}
                                alt="Card image cap"
                                style={imgEvent}
                              /> */}
                            </div>
                          </div>
                        );


                    })}

                </div>
                <Link to='/graduatepage' className="btn button">
                    <button className="button ani " >Graduated Page            </button>
                </Link>
            </div>

        </div>
        </>
    )
}