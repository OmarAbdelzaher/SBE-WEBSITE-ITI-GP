import React from "react";
import About from "../components/about";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";
import News from "../components/News";
import Events from "../components/Events";
import Academics from "../components/Academics";
// import Counter from "../components/Counter";
// import Grad from "../components/Grad";

import "./style.css";

const Home = () => {

  return (
    <>
    <div className="home">
      <NavBar />
      <section className="s-one"><div className="img"></div></section>

      {/* <section className="s-one"></section> */}
      <News/>
      <Events/>
      <Academics/>
      {/* <Grad/> */}
      {/* <Counter/> */}
        <About />
      <Footer/>
    </div>
      
    </>
  );
};

export default Home;
