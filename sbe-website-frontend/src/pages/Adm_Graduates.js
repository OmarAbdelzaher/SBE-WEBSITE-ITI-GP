import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Adm_Graduates = () => {
  const params = useParams();
  const [admission, setAdmission] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/admission/${params.id}`)
      .then((res) => {
        console.log(res.data)
        setAdmission(res.data)
      })
  }, []);
  

    return (
    <>
 <div className="container">
        <section className="member-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-8">
                <div className="member_designation">
                    <br></br>
                    <br></br>
                  <h2>Admission</h2>
                  <span>Graduates</span>
                </div>
                <div className="member_desc">
                  <h1>{admission.title}</h1>
                  <p>
                  Being a University Student should be one of the most exciting times of your life. Yet, it brings a whole new set of pressures and challenges. Today’s employment market is more competitive than ever. To stand out from the crowd, you need an education that provides you with the skills, abilities and qualifications that employers will understand and respect. In this increasingly global economy you need qualifications that are recognised in egypt.
                  </p>
                  <ul className="styled_list">
                    <li className><i className="fa fa-chevron-circle-right" aria-hidden="true" /> Birth certificate or certified original.</li>
                    <li className><i className="fa fa-chevron-circle-right" aria-hidden="true" /> Copy of National ID.</li>
                    <li className><i className="fa fa-chevron-circle-right" aria-hidden="true" /> 6 passport-size photos.</li>
                    <li className><i className="fa fa-chevron-circle-right" aria-hidden="true" /> Military Service Form “Namozag 2-3 Gond” (Egyptian males only).</li>
                  </ul>
                </div>
                <img
                  src="https://cdn.lifehack.org/wp-content/uploads/2014/11/Graduate.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                    height: "300px"
                  }}
                  alt="Sample photo"
                />
                <div className="member_desc">
                  <h4>General Requirements </h4>
                  <p>
                    Vinteger eu libero rutrum, imperdiet arcueniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit volup tatem. accusantium doloremque laudantium.
                  </p>
                </div>
                <div className="row ">
                  <div className="col-lg-6 member_desc">
                    <h4>Transfer Students</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
                    </p>
                  </div>
                  <div className="col-lg-6 member_desc">
                    <h4>Foreign Certificates</h4>
                    <p>
                      Cepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Adm_Graduates;
