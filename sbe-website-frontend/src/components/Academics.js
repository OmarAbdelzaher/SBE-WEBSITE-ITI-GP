import React from 'react'

// import { CardView } from 'react-card-with-image'
// import Card from 'react-bootstrap/Card'
// import 'react-card-with-image/dist/index.css'
import './Academics.css'


export default function Academics() {



    return (
        <>
            <h1 className='text-center'>Academics</h1>

            <div className="container">
                {/* Card deck */}
                <div className="card-deck row">
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        {/* Card */}
                        <div className="card mb-4 cardimg">
                            {/*Card image*/}
                            <div className="view overlay">
                                <img className="card-img-top imgcard" src="https://lv7ms1pq6dm2sea8j1mrajzw-wpengine.netdna-ssl.com/wp-content/uploads/2014/05/shutterstock_789412672-1200x675.jpg"  />
                                <a href="#!">
                                    <div className="mask rgba-white-slight" />
                                </a>
                            </div>
                            {/*Card content*/}
                            <div className="card-body">
                                {/*Title*/}
                                <h4 className="card-title">Gradute</h4>
                                {/*Text*/}
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                                <button type="button" className="btn btn-primary btn-md">Read more</button>
                            </div>
                        </div>
                        {/* Card */}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6">
                        {/* Card */}
                        <div className="card mb-4 cardimg">
                            {/*Card image*/}
                            <div className="view overlay">
                                <img className="card-img-top imgcard" src='https://imageio.forbes.com/specials-images/imageserve/5e020def4e2917000783d582/0x0.jpg?format=jpg&width=1200&fit=bounds' />
                                <a href="#!">
                                    <div className="mask rgba-white-slight" />
                                </a>
                            </div>
                            {/*Card content*/}
                            <div className="card-body">
                                {/*Title*/}
                                <h4 className="card-title">Under Graduate</h4>
                                {/*Text*/}
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                                <button type="button" className="btn btn-primary  btn-md">Read more</button>
                            </div>
                        </div>
                        {/* Card */}
                    </div>



                </div>
                {/* Card deck */}
            </div>



        </>

    )

}


