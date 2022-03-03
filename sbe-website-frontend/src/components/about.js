import React from "react";
import '../pages/style.css'

function About() {
  return (
    <>
      <section className="s-tow row">
        <h1 className="col-md-6 offset-md-3 text-center about-h">
          About Department
        </h1>
        <p className=" text-center about-b col-12">
          CASBEC (Center for Advanced Software and Biomedical Engineering
          Consultations) is one of the special units Faculty of Engineering
          semi[private centers working under the authority of Cairo University.
          It resides in the Faculty of Engineering campus occupying an area of
          over 700 square meters. CASBEC provides solutions in the fields of
          biomedical engineering and health services as well as software
          development. Activities range from Research & Development (R&D) to
          Custom-made services and consultations. A number of experts in various
          engineering field and software programmers have joined together to
          provide solutions within CASBEC environment.
        </p>
      </section>
      
    </>
  );
}

export default About;
