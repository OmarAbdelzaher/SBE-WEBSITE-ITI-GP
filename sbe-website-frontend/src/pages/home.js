import React from "react";
import About from "../components/about";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";
import News from "../components/News";
import Events from "../components/Events";
import Academics from "../components/Academics";
import { connect , useSelector } from "react-redux";

import "./style.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <NavBar />
        <section className="s-one"><div className="img"></div></section>
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
