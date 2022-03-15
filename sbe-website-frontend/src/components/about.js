import React from "react";
import "../pages/style.css";

function About() {
  return (
    <>
      <section className="s-tow row" id="about">
        <h1 className="col-md-6 offset-md-3 text-center about-h">
          About Department
        </h1>
        <p className=" text-center about-b col-12">
          Biomedical engineering is the application of the principles and
          problem-solving techniques of engineering to biology and medicine.
          This is evident throughout health care, from diagnosis and analysis to
          treatment and recovery, and has entered the public conscience though
          the proliferation of implantable medical devices, such as pacemakers
          and artificial hips, to more futuristic technologies such as stem cell
          engineering and the 3-D printing of biological organs. Biomedical
          engineering focuses on the advances that improve human health and
          health care at all levels. it is the application of engineering
          principles and design concepts to medicine and biology for health care
          purposes.
        </p>
      </section>
    </>
  );
}

export default About;
