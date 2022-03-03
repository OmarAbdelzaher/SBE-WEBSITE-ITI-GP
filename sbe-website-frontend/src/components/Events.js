import React from "react";
import EventData from "./EventData";
import image from '../assets/image/cardimg.jpg'


export default function Events(props) {
    const btnStyle = {
        color: 'white',
        width: '50%',
        height: '50%',
    };

    return (
        <>


            <h1 className="mb-5 mt-3 text-center">Events section </h1>

            <div className="container-fluid mt-2">
                <div className="row">
                    {EventData.map((item) => {
                        return (

                            <div className="col-md-4 ">
                                <div className="card mb-4 " key={item.id}>
                                    <h2>{item.title}</h2>
                                    <img src={image}  />
                                    <p>{item.description}</p>
                                    <small>{item.date}</small>


                                </div>
                            </div>
                        );


                    })}

                </div>

            </div>
            <div class="row">
    <div class="col text-center">
    <button className="btn btn-danger btn-lg mb-5 " style={btnStyle} >
                More SBE News
            </button>


    </div>
  </div>

        </>
    );
}