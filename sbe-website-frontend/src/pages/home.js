import React from "react";
import About from "../components/about";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import News from "../components/News";
import Events from "../components/Events";
import Academics from "../components/Academics";
// import Counter from "../components/Counter";

import "./style.css";

const Home = () => {
  return (
    <>
      <Header/>
      <NavBar />
      <section className="s-one"></section>
      <News/>
      <Events/>
      <Academics/>
      {/* <Counter/> */}
      <About />
    </>
  );
};

export default Home;
