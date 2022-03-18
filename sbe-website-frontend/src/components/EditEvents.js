import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditEvent() {
  const params = useParams();
  let Url = `http://localhost:8000/api/event/${params.id}`;
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [changed, setChanged] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/event/${params.id}`)
      .then((res) => setPhoto(res.data.picture));
  }, []);

  const [formData, setFormData] = useState({
    name: params.name,
    details: params.details,
    picture: photo,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.details) {
      errors.details = "Details is required";
    }
    return errors;
  };
  const [pic, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log("pic: ", e.target.files);
      setChanged(true);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors_form = validate(formData);
    setFormErrors(validate(formData));

    if (Object.keys(errors_form).length === 0) {
      const Data = new FormData();
      Data.append("name", formData.name);
      if (changed == true) {
        formData.picture = pic;
        Data.append("picture", formData.picture);
      }
      Data.append("details", formData.details);

      axios
        .put(Url, Data)
        .then((res) => {
          history.push("/moderatorevent");
        })
        .catch((e) => {
          setFormErrors(e.response.data.non_field_errors[0]);
        });
    }
  };

  return (
    <>
      <section>
        <section className="h-150 h-custom">
          <div className="container py-5 h-150">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3 courses-b ">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Edit Events Form
                    </h3>
                    <form className="px-md-2" onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="name" className="form-label">
                              Title
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">{formErrors.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="details" className="form-label">
                              Details
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="details"
                              name="details"
                              value={formData.details}
                              onChange={(e) => onChange(e)}
                            />
                            <p className="text-danger">{formErrors.details}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4 d-flex align-items-center">
                          <div className="form-outline datepi+cker w-100">
                            <label htmlFor="photo" className="form-label">
                              Photo
                            </label>
                            <br />
                            <input
                              onChange={(e) => onChangePicture(e)}
                              type="file"
                            />
                          </div>
                        </div>
                      </div>

                      <br />
                      <button type="submit" className="btn button btn-lg mb-1">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
