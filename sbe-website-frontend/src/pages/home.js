import React from "react";
import About from "../components/about";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";
import "./style.css";

const Home = () => {

  return (
    <>
    <div className="home">
      <NavBar />
      <section className="s-one"><div className="img"></div></section>
        <About />
      <Footer/>
    </div>
      
    </>
  );
};

export default Home;
