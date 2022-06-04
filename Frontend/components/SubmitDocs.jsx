import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClassNames } from "@emotion/react";
import "./CSS/st.css";
import FileInput from "./FileInput";
import { Store } from "react-notifications-component";

export default function SubmitDocs() {
  const [type, setType] = useState();
  const [userEmail, setuserEmail] = useState();
  useEffect(() => {
    setType(localStorage.getItem("SchemaType"));
    setuserEmail(JSON.parse(localStorage.getItem("user")).email);
    //console.log(JSON.parse(localStorage.getItem("user")).email);
  }, []);

  //file upload
  const [data, setData] = useState({
    name: "upload",
    email: JSON.parse(localStorage.getItem("user")).email,
    GroupID: "",
    ResearchField: "",
    ResearchTopic: "",
    Document: "",
    DocType: localStorage.getItem("SchemaType"),
    Comment: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    console.log("21 ", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_API_URL + "document";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      console.log(data);

      Store.addNotification({
        title: "Submit Doc Successfully.",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 1500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });

      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="t-list-container">
          <div style={{ backgroundColor: "#0F0934" }}>
            <div>
              <img
                className="img-side"
                src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"
              ></img>
            </div>
          </div>
          <div style={{ backgroundColor: "white" }}>
            <div
              className="ms-5 mt-5 me-5"
              style={{
                backgroundColor: "#0F0934",
                height: "30px",
                color: "white",
              }}
            >
              <h4 className="ms-2">{type} Submission</h4>
            </div>

            <div
              className="ms-5 mt-3 me-5"
              style={{
                backgroundColor: "#fefe33",
                height: "20px",
                color: "red",
              }}
            >
              <h6 className="ms-2">
                Upload the document here.{" "}
                <b>
                  Note that for the late submissions there will be a deduction
                  from the allocated marks
                </b>
              </h6>
            </div>

            <div className="t-list-tb-container mt-3">
              <div className="mb-3">
                <label className="t-form-label">
                  <b>Group ID :</b>
                </label>
                <input
                  type="text"
                  style={{ width: "450px" }}
                  id="cName"
                  required
                  name="GroupID"
                  onChange={handleChange}
                  value={data.GroupID}
                />
              </div>

              <div className="mb-3">
                <label className="t-form-label">
                  <b>Research Field:</b>
                </label>

                <select
                  className="form-control"
                  name="ResearchField"
                  id="Field"
                  style={{ width: "450px", border: "2px solid #ced4da" }}
                  required
                  onChange={handleChange}
                  value={data.ResearchField}
                >
                  <option value="Default">Select one</option>
                  <option value="Artificial Interligance">
                    Artificial Interligance
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Games">Games</option>
                  <option value="Robotics">Robotics</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="t-form-label">
                  <b>Research Topic :</b>
                </label>
                <input
                  type="text"
                  style={{ width: "450px" }}
                  id="cName"
                  required
                  name="ResearchTopic"
                  onChange={handleChange}
                  value={data.ResearchTopic}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="t-form-label">
                  <b>Upload Template</b>
                </label>
                <div style={{ width: "470px" }}>
                  <FileInput
                    name="song"
                    label="Choose File"
                    handleInputState={handleInputState}
                    type="file"
                    value={data.song}
                  />
                </div>
                <div className="col-sm-4">
                  <br></br>
                </div>
              </div>

              <div className="mb-3">
                <label className="t-form-label">
                  <b>Comments:</b>
                </label>
                <input
                  type="text"
                  style={{ width: "450px", height: "100px" }}
                  id="cName"
                  name="Comment"
                  onChange={handleChange}
                  value={data.Comment}
                />
              </div>
              <br></br>
              <p>
                <a
                  href="/DownloadTemplate"
                  type="submit"
                  className="btn btn-primary mb-5"
                  style={{
                    backgroundColor: "#FF5631",
                    width: "150px",
                    fontWeight: "bold",
                    marginLeft: "0%",
                  }}
                >
                  CANCEL
                </a>
                <button
                  type="submit"
                  className="btn btn-primary mb-5"
                  style={{
                    backgroundColor: "#0F0934",
                    width: "150px",
                    fontWeight: "bold",
                    marginLeft: "10%",
                  }}
                >
                  SUBMIT
                </button>
              </p>
            </div>

            <div className="bottom-t-container">
              <label className="bottom-t" style={{ color: "#FF5631" }}>
                {" "}
                SLIIT
              </label>{" "}
              <label className="bottom-t"> Research</label> <br />
              <label className="bottom-t"> Management Tool</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
