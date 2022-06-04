import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/st.css";
import "./CSS/stgrup.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";

export default function AllStudentGroup() {
  const [group, setGroups] = useState([]);
  const history = useHistory();

  //user authenticate

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
    axios
      .get("https://research-management-tool-ym.herokuapp.com/stdGroup")
      .then((res) => {
        setGroups(res.data);
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
              ALL STUDENT
            </label>{" "}
            <br className="br1" />
            <label className="h-text">GROUPS</label>
          </div>

          <section className="py-4 container">
            <div className="py-2 container">
              <table class="table border shadow" id="emp-table">
                <thead class="thread-dark">
                  <tr>
                    <th scope="col">Leader Name</th>
                    <th scope="col">Member 1</th>
                    <th scope="col">Member 2</th>
                    <th scope="col">Member 3</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(group)}
                  {group.map((data, index) => (
                    <tr key={index}>
                      <td className="py-5 ">{data.Student_ID}</td>
                      <td className="py-5 ">{data.Member2_ID}</td>
                      <td className="py-5 ">{data.Member3_ID}</td>
                      <td className="py-5 ">{data.Member4_ID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ReactHTMLTableToExcel
                className="btn btn-primary mb-3"
                table="emp-table"
                filename="Student Group file"
                sheet="Sheet"
                buttonText="Export to Excel"
                // backgroundColor="#0F0934"
                // width="200px"
                // fontWeight="bold"
                // marginLeft="80%"
              />

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
