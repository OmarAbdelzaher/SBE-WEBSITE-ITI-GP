import React from "react";
import About from "../components/about";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";
import News from "../components/News";
import Events from "../components/Events";
import Academics from "../components/Academics";
// import OfficeHours from "../components/OfficeHours";
import { connect , useSelector } from "react-redux";

import "./style.css";

const Home = () => {
  
  return (
    <>
      <div className="home">
        <NavBar />
        <section className="s-one"><div className="img">
          <h1 className="bg-text d-flex justify-content-center align-items-center">SBME CAIRO UNIVERSITY</h1>
          </div></section>
        {/* <OfficeHours /> */}
        <News />
        <Events />
        <Academics />
        {/* <Counter/> */}
      {/* <Grad/> */}
      {/* <Counter/> */}
        <About />
        <Footer />
      </div>

    </>
  );
};

export default Home;
