import React from "react";
import About from "../components/about";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import "./style.css";

const Home = () => {
  return (
    <>
      <Header/>
      <NavBar />
      <section className="s-one"></section>
      <About />
    </>
  );
};

export default Home;
