import React from "react";
import DataNews from "./DataNews";
import './cards.css'
import img from '../assets/image/new.jpg'
// import images from "../../images"
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";



export default function News() {

    const [News, setNews] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:8000/api/news"
          )
          .then((res) => setNews(res.data));
      }, []);
    
    const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
        // background:'blue',
        
    };


    return (
        <>
        <br></br>
            <h1 className="mb-5 mt-5 text-center">News section </h1>

            <div className="container mt-2">
                <div className="row">
                    {News.slice(0,3).map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 cardItem" key={item.id}>
                                    <p>{item.id}</p>

                                    <h2>{item.name}</h2>
                                   {/* <img src={`${item.picture}`}/> */}
                                   {/* {item.picture.url}  */}
                                    {/* <img src={img}  className="card--image" /> */}
                                    <p>{item.description}</p>


                                </div>
                            </div>
                        );


                    })}

                </div>

            </div>
       
            <div class="container">
  <div class="row">
    <div class="col text-center">


    <Link to='/allnews' className="nav-link">
    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >
                More SBE News
            </button>
            </Link>
          
               

    </div>
  </div>
</div>

        </>
    )
}