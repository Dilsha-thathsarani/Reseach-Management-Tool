import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClassNames } from "@emotion/react";
import "./CSS/st.css";
import FileInput from "./FileInput";
import { Store } from "react-notifications-component";
import { useHistory } from "react-router-dom";

export default function UploadTemplate() {
  //file upload
  const [data, setData] = useState({
    name: "upload",
    Template: "",
    AdminName: "",
    SchemaType: "",
    Title: "",
    Description: "",
    DeadlineDate: "",
    DeadlineTime: "",
  });
  let history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    console.log("21 ", data);
  };

  //USER AUTHENTICATE

  function authenticate() {
    if (JSON.parse(localStorage.getItem("user") || "[]").user_role != "Admin") {
      history.push("/login");
      Store.addNotification({
        title: "You are not allowed!",
        message:
          "You are not allowed to access this page! Please login as an Admin",

        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        type: "danger",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 3000,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      authenticate();
    }, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_API_URL + "template";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      console.log(data);

      Store.addNotification({
        title: "Create New Submission Type Successfully.",
        animationIn: ["animate_animated", "animate_fadeIn"],
        animationOut: ["animate_animated", "animate_fadeOut"],
        type: "success",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 2500,
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
            <div className="t-list-head-container">
              <label className="h-text" style={{ color: "#FF5631" }}>
                {" "}
                UPLOAD
              </label>{" "}
              <br className="br1" />
              <label className="h-text">Document/Presentation Template</label>
            </div>

            <div className="t-list-tb-container mt-2">
              <div className="mb-3">
                <label className="t-form-label">
                  <b>Admin Name:</b>
                </label>
                <input
                  type="text"
                  style={{ width: "450px" }}
                  id="cName"
                  required
                  name="AdminName"
                  onChange={handleChange}
                  value={data.AdminName}
                />
              </div>
              <div className="mb-3 ">
                <label className="t-form-label">
                  <b>Schema Type:</b>
                </label>

                <select
                  className="form-control m-select"
                  id="Field"
                  style={{
                    fontSize: "1rem",
                    width: "450px",
                    border: "2px solid #ced4da",
                    height: "40px",
                  }}
                  name="SchemaType"
                  onChange={handleChange}
                  value={data.SchemaType}
                >
                  <option value="Default">Select one</option>
                  <option value="RP Group">RP Group List</option>

                  <option value="Topic Details Document">
                    Topic Details Document
                  </option>

                  <option value="Proposal Presentation">
                    Proposal Presentation
                  </option>
                  <option value="Progress Presentation">
                    Progress Presentation
                  </option>
                  <option value="Final Presentation">Final Presentation</option>
                  <option value="Chater Documentation">
                    Chater Documentation
                  </option>
                  <option value="Scrum Documentation">
                    Scrum Documentation
                  </option>
                  <option value="Proposal Documentation">
                    Proposal Documentation
                  </option>
                  <option value="Progress Documentation">
                    Progress Documentation
                  </option>
                  <option value="Final Documentation">
                    Final Documentation
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label className="t-form-label">
                  <b>Document/Presentation Title:</b>
                </label>
                <input
                  type="text"
                  style={{ width: "450px" }}
                  id="cName"
                  required
                  name="Title"
                  onChange={handleChange}
                  value={data.Title}
                />
              </div>

              <p>
                {/*  date */}
                <div lassName="mb-5" style={{ width: "200px" }}>
                  <label className="t-form-label">
                    <b>Submit Date:</b>
                  </label>
                  <input
                    type="date"
                    id="cName"
                    required
                    name="DeadlineDate"
                    onChange={handleChange}
                    value={data.DeadlineDate}
                  ></input>
                </div>
                {/* time */}
                <div lassName="mb-5" style={{ width: "200px" }}>
                  <label className="t-form-label">
                    <b>Submit Time:</b>
                  </label>
                  <input
                    type="time"
                    id="cName"
                    name="DeadlineTime"
                    onChange={handleChange}
                    value={data.DeadlineTime}
                  ></input>
                </div>
              </p>
              <div className="mb-3"></div>
              <div className="mb-3">
                <label htmlFor="formFile" className="t-form-label">
                  <b>Upload Template/Document</b>
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
                  <b>Description about the Template/Document:</b>
                </label>
                <br></br>
                <textarea
                  rows="4"
                  type="textarea"
                  style={{ width: "450px", height: "100px" }}
                  id="cName"
                  name="Description"
                  onChange={handleChange}
                  value={data.Description}
                />
              </div>
              <br></br>
              <p>
                <a
                  href="/"
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
                  UPLOAD
                </button>
              </p>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="bottom-t-container " style={{ marginBottom: "-6em" }}>
        <label className="bottom-t" style={{ color: "#FF5631" }}>
          {" "}
          SLIIT
        </label>{" "}
        <label className="bottom-t"> Research</label> <br />
        <label className="bottom-t"> Management Tool</label>
      </div> */}
    </div>
  );
}
