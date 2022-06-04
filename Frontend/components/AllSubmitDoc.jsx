import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/st.css";
import "./CSS/stgrup.css";
import { style } from "@mui/system";

export default function AllSubmitDoc() {
  const [type, setType] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://research-management-tool-ym.herokuapp.com/document/student/${
          JSON.parse(localStorage.getItem("user")).email
        }`
      )
      .then((res) => {
        setType(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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
            {type.map((data, index) => (
              <div key={index}>
                <div
                  className="ms-5 mt-3 me-5"
                  style={{
                    backgroundColor: "#0F0934",
                    height: "30px",
                    color: "white",
                  }}
                >
                  <h4 className="ms-2">{data.DocType}</h4>
                </div>
                <div className="mt-4 ms-5 me-5">
                  <h5>
                    <b>Submission Status</b>
                  </h5>
                </div>

                <div className="container mt-5 ">
                  <table
                    class="table table-striped container"
                    style={{ marginLeft: "35px" }}
                  >
                    <tbody>
                      <tr>
                        <td scope="col">
                          <b>Group ID</b>
                        </td>
                        <td scope="col">{data.GroupID}</td>
                      </tr>
                      <tr>
                        <td scope="col">
                          <b>Status</b>
                        </td>
                        {console.log(
                          "68",
                          data.Status,
                          "chk ",
                          data.Status == "Pending"
                        )}
                        {data.Status == "Pending" ? (
                          <td scope="col">{data.Status}</td>
                        ) : (
                          <td
                            scope="col"
                            style={{ backgroundColor: "#fefe33" }}
                          >
                            {data.Status}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td scope="col">
                          <b>Last modified</b>
                        </td>
                        <td scope="col">{data.updatedAt}</td>
                      </tr>
                      <tr>
                        <td scope="col">
                          <b>Submission Comments</b>
                        </td>
                        <td>
                          <textarea className="mt-2" disabled>
                            {data.Comment}
                          </textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br></br>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
