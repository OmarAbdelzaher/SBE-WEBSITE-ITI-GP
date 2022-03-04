import React from "react";
// import Header from "./header";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";


export default function AllNews(){

    const [AllNews, setAllNews] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/news"
          )
          .then((res) => setAllNews(res.data));
      }, []);
    

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
        <h1> Hello in All News</h1>

        <p>ALOOOOOOOOOOOOOOoo</p>

        <div className="container-fluid mt-2">
                <div className="row">
                    {AllNews.map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 cardItem" key={item.id}>
                                    <p>{item.id}</p>

                                    <h2>{item.name}</h2>
                                    {item.picture}
                                    {/* <img src={img}  className="card--image" /> */}
                                    <p>{item.description}</p>


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