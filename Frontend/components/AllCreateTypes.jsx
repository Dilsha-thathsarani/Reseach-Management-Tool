import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/st.css";
import "./CSS/stgrup.css";

export default function AllCreateTypes() {
  const [type, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/template")
      .then((res) => {
        setTypes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div>
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
              ALL SUBMISSION
            </label>{" "}
            <br className="br1" />
            <label className="h-text">TYPES</label>
          </div>

          <section className="py-4 container">
            <div className="py-2 container">
              <table class="table border shadow" id="emp-table">
                <thead class="thread-dark">
                  <tr>
                    <th scope="col">Schema Type</th>
                    <th scope="col">Title</th>
                    <th scope="col">Template</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(type)}
                  {type.map((data, index) => (
                    <tr key={index}>
                      <td className="py-5 ">{data.SchemaType}</td>
                      <td className="py-5 ">{data.Title}</td>
                      <td className="py-5 ">
                        <button type="button" className="btn btn-link btn-lg">
                          <a href={data.Template}>
                            <i class="bi bi-file-earmark-arrow-down-fill fa-5x"></i>
                          </a>
                        </button>
                      </td>
                      <td className="py-5 ">{data.Description}</td>
                      <td className="py-5 ">
                        <a
                          className="btn btn-warning "
                          href="/details"
                          onClick={() => setData(data)}
                        >
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp; &nbsp;
                        <a
                          className="btn btn-danger"
                          href="/delete"
                          onClick={() => setData(data)}
                        >
                          <i className="far fa-trash-alt"></i>&nbsp;Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bottom-t-container">
                <label className="bottom-t" style={{ color: "#FF5631" }}>
                  {" "}
                  SLIIT
                </label>{" "}
                <label className="bottom-t"> Research</label> <br />
                <label className="bottom-t"> Management Tool</label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}