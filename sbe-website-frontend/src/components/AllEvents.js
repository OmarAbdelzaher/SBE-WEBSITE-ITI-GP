import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import image from '../assets/image/cardimg.jpg'
import _ from 'lodash';



export default function AllEvents(){

    const [AllEvents, setAllEvents] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/events/"
          )
          .then((res) => setAllEvents(res.data));
      }, []);
    //   function sortUsersByAsc() {
    //     const orderBy = _.orderBy(users, ['name'], ['asc']);
    //     setUsers(orderBy);
    //   }
      
    //    function sortUsersByDesc() {
    //     const orderBy = _.orderBy(AllEvents, ['id'], ['desc']);
    //     setAllEvents(orderBy);
    //   }
    //   const sortDescending = () => {
    //     const sortDescPrices = [...prices]
    //     sortDescPrices.sort((a, b) => a - b).reverse()
    //     setPrices( sortDescPrices )
    // }

    // Full function for readability
function orderByOrderValue( a, b ) {
    if ( a.id > b.id ){
      return -1;
    }
    if ( a.id <b.id ){
      return 1;
    }
    return 0;
  }
      const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
        // background:'blue',
        
    };
    // const singleEvent={
    //      width: '90%',
    //     height: '60%',
    // }
    const imgEvent={
        height:'250px',
    }
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
        <h1> Hello in All Events</h1>


        <div className="container ">
                <div className="row">
                    {AllEvents.sort(orderByOrderValue).map((item) => {
                         return (
                            <div className="col-md-9 col-sm-12">
                              <div  class="card " key={item.id}  >
                                <div class="card-body">
                                  <h5 class="card-title">{item.name}</h5>
                                  <p class="card-text">{item.details}</p>
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
                {/* <button onClick={() => sortUsersByDesc()}>Sort List By <b>Z to A</b> &uarr;</button> */}

                <Link to='/' className="nav-link">
                    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >Return Home            </button>
                </Link>
            </div>

        </div>
        </>
    )
}