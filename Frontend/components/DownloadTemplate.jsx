import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClassNames } from "@emotion/react";
import "./CSS/st.css";

import { useHistory } from "react-router-dom";

export default function DownloadTemplate() {
  const [type, setTypes] = useState([]);
  const history = useHistory();
  //const[SchemaType, setSchemaType] = useState([]);

  useEffect(() => {
    axios
      .get("https://research-management-tool-ym.herokuapp.com/template")
      .then((res) => {
        setTypes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setData = (data) => {
    console.log("data", data);

    let { SchemaType } = data;

    localStorage.setItem("SchemaType", SchemaType);

    history.push("/SubmitDocs");
  };
  return (
    <div>
      <form>
        <div className="t-list-container">
          <div style={{ backgroundColor: "#0F0934" }}>
            <div>
              <img
                className="img-side"
                src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"
              ></img>
            </div>
          </div>
          <div className="mt-3" style={{ backgroundColor: "white" }}>
            <div
              className="ms-5 mt-3 me-5"
              style={{ backgroundColor: "#C4C4C4", height: "30px" }}
            >
              <h4 className="ms-2">General</h4>
            </div>
            <div className="mt-3">
              <img
                style={{
                  marginLeft: "30%",
                  width: "20%",
                }}
                className="img-side"
                src="https://res.cloudinary.com/waste123/image/upload/v1653990790/RMTS/e3x5qx0dsv9mendotzak.jpg"
              ></img>
            </div>

            <div className="mb-3 t-list-tb-container mt-4">
              <h5>
                <b>
                  <label className="mt-2" style={{ backgroundColor: "yellow" }}>
                    NOTICE : RP Group Registration
                  </label>
                  <h6 className="mt-2">
                    - This is a mandatory form for every project group.<br></br>{" "}
                    - Only the group leader have to fill this form.
                    <br></br>- This information is considered as the official
                    information to issue your permanent project IDs. <br></br>-
                    Therefore,
                    <u>
                      {" "}
                      fill in the information carefully. You will not be able to
                      change any of the given details after submission.
                    </u>{" "}
                    <br></br> - Double check your IT numbers before submitting
                    the form as this will be used for marksheet generation.
                  </h6>
                  <h6 className="mt-2">
                    <b>
                      DEADLINE:
                      <label
                        className="mt-2"
                        style={{ backgroundColor: "yellow" }}
                      >
                        05-02-2022
                      </label>
                    </b>
                  </h6>
                  <a href="/StudentGroup">
                    <i>Click here to submit the form</i>
                  </a>
                </b>
              </h5>
            </div>

            {type.map((data, index) => (
              <div key={index}>
                {console.log(data)};
                <div
                  className="ms-5 mt-3 me-5"
                  style={{ backgroundColor: "#C4C4C4", height: "30px" }}
                >
                  <h4 className="ms-2">{data.Title}</h4>
                </div>
                <div className="t-list-tb-container mt-4">
                  <div className="mb-2" style={{ marginLeft: "15px" }}>
                    <label htmlFor="formFile" className="t-form-label">
                      <i class="bi bi-folder-fill fa-5x"></i>
                      &nbsp;{data.SchemaType}
                    </label>
                  </div>

                  <div className="mb-1 " style={{ marginLeft: "15px" }}>
                    <label className="t-form-label">
                      <h6>{data.Description}</h6>
                    </label>
                  </div>

                  <div className="mb-1 " style={{ marginLeft: "15px" }}>
                    <label className="t-form-label">
                      <h6 style={{ backgroundColor: "#fefe33" }}>
                        {" "}
                        <b>DEADLINE :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {data.DeadlineDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {data.DeadlineTime}
                      </h6>
                    </label>
                  </div>
                </div>
                <div style={{ marginLeft: "125px" }}>
                  <a
                    href={data.Template}
                    type="submit"
                    className="bi bi-file-earmark-arrow-down-fill fa-5x btn pb-4"
                    style={{
                      backgroundColor: "#0F0934",
                      color: "white",
                      width: "125px",
                      height: "30px",
                    }}
                  >
                    Download
                  </a>
                </div>
                <div style={{ marginLeft: "125px" }}>
                  <button
                    type="button"
                    className="btn btn-link "
                    style={{
                      outline: "none ",
                      border: "none ",
                      boxShadow: "none ",
                    }}
                    onClick={() => setData(data)}
                  >
                    <i>Click here to submit</i>
                  </button>
                </div>
              </div>
            ))}

            {/* <div className="bottom-t-container">
              <label className="bottom-t" style={{ color: "#FF5631" }}>
                SLIIT
              </label>{" "}
              <label className="bottom-t"> Research</label> <br />
              <label className="bottom-t"> Management Tool</label>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
