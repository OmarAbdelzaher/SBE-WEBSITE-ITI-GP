import React from "react";
import DataNews from "./DataNews";
import './cards.css'
import img from '../assets/image/new.jpg'
// import images from "../../images"


export default function News(props) {
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

            <div className="container-fluid mt-2">
                <div className="row">
                    {DataNews.map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 cardItem" key={item.id}>
                                    <h2>{item.title}</h2>
                                    <img src={img}  className="card--image" />
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
    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >
                More SBE News
            </button>


    </div>
  </div>
</div>

        </>
    )
}