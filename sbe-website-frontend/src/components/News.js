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
            "http://localhost:8000/api/news/"
          )
          .then((res) => setNews(res.data));
      }, []);
    
    const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
        // background:'blue',
        
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
        <br id="allnews"></br>
            <h1  className="mb-5 mt-5 text-center">News section </h1>

            <div className="container mt-2">
                <div className="row">
                    {News.sort(orderByOrderValue).slice(0,3).map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 cardItem" key={item.id}>
                                    {/* <p>{item.id}</p> */}

                                    <h2>{item.title}</h2>
                                    <img src={item.picture} />
                                   {/* <img src={`${item.picture}`}/> */}
                                   {/* {item.picture.url}  */}
                                    {/* <img src={img}  className="card--image" /> */}
                                    <p>{item.description}</p>
                                    {/* <p>{item.category}</p> */}

                                    

                                </div>
                            </div>
                        );


                    })}

                </div>

            </div>
       
           

<div className="justify-content-center align-items-center d-flex">
<Link to='/allnews' className="btn button">
    <button className="ani button" >
                All News
            </button>
            </Link>

</div>
  
          
               

    


        </>
    )
}