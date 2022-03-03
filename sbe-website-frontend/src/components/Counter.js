import React from "react"
import './Count.css'

export default function Counter() {



    return (
        <>



            <div>
              
                
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" />
                <div className="sectiontitle">
                    <h2 className="mt-5" >Department statistics</h2>
                    <span className="headerLine" />
                </div>
                <div id="projectFacts" className="sectionClass">
                    <div className="fullWidth eight columns">
                        <div className="projectFactsWrap ">
                            <div className="item wow fadeInUpBig animated animated" data-number={12} style={{ visibility: 'visible' }}>
                                <i className="fa fa-briefcase" />
                                <p id="number1" className="number">12</p>
                                <span />
                                <p>Projects done</p>
                            </div>
                            <div className="item wow fadeInUpBig animated animated" data-number={55} style={{ visibility: 'visible' }}>
                                <i className="fa fa-smile-o" />
                                <p id="number2" className="number">55</p>
                                <span />
                                <p>Happy clients</p>
                            </div>
                            <div className="item wow fadeInUpBig animated animated" data-number={359} style={{ visibility: 'visible' }}>
                                <i className="fa fa-lightbulb-o " />
                                <p id="number3" className="number">359</p>
                                <span />
                                <p>Cups of coffee</p>
                            </div>
                            <div className="item wow fadeInUpBig animated animated" data-number={246} style={{ visibility: 'visible' }}>
                                <i className="fa fa-camera" />
                                <p id="number4" className="number">246</p>
                                <span />
                                <p>Photos taken</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
        </>
    )
}