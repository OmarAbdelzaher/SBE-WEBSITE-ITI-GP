import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faTwitter, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {
    faBuildingColumns,
  faCopyright,
  faEnvelope,
  faHome,
  faInbox,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
    <div className="row footer" id="contact" >
      <section className="f-one text-center col-12">
        <Link
          className="icon fs-3"
          to={{ pathname: "https://www.facebook.com/" }}
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </Link>

        <Link
          className="icon fs-3"
          to={{ pathname: "https://www.facebook.com/" }}
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>

        <Link
          className="icon fs-3"
          to={{ pathname: "https://www.facebook.com/" }}
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>

        <Link
          className="icon fs-3"
          to={{ pathname: "https://www.facebook.com/" }}
          target="_blank"
        >
          <FontAwesomeIcon icon={faGoogle} />
        </Link>
        <div className="row">
          <p className="contact col-auto me-auto">
            <h1 className="fs-3 text-light">Contact </h1>
            <span>
              <br />
              <FontAwesomeIcon icon={faPhone} /> +01 111 111 11
            </span>
            <br /> <br />
            <span>
              <FontAwesomeIcon icon={faInbox} />
              {"   "}
              +01 111 111 11
            </span>
            <br /> <br />
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              {"   "}
              info@example.com
            </span>
          </p>
          <p className="col-auto adress ">
            <h1 className="fs-3 text-light">Adress </h1>
            <span>
            <FontAwesomeIcon icon={faHome} />
              {"   "}
              <a style={{textDecoration: 'none',color: '#8b8e93'}} href="https://www.google.com/maps/dir//Faculty+of+Engineering+-+Cairo+University+Cairo+University+Rd+Oula+Giza+District,+Giza+Governorate/@30.0263303,31.21167,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1458472fa8265ddb:0x282c4b44cdf7e83c!2m2!1d31.21167!2d30.0263303/" >Faculty Location </a><br/> <br/>
            </span>
            <span>
            <FontAwesomeIcon icon={faBuildingColumns} />
              {"   "}
              <a style={{textDecoration: 'none',color: '#8b8e93'}} href="http://cufe.edu.eg/wp-content/uploads/2014/12/map.jpg" >Faculty Map </a><br/> <br/>
            </span>
            <span>
            <FontAwesomeIcon icon={faHome} />
              {"   "}
              <a style={{textDecoration: 'none',color: '#8b8e93'}} href="https://www.google.com/maps/dir//Faculty+of+Engineering+-+Cairo+University+Cairo+University+Rd+Oula+Giza+District,+Giza+Governorate/@30.0263303,31.21167,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1458472fa8265ddb:0x282c4b44cdf7e83c!2m2!1d31.21167!2d30.0263303/" >Department Map</a>
            </span>
          </p>
        </div>
      </section>
      <div className="rights text-center col-12">
        <p>
        <FontAwesomeIcon icon={faCopyright} />{" "}
        Copyright 2022 | ITI STUDENT
        </p>
      </div>
    </div>
    </>
  );
}

export default Footer;
