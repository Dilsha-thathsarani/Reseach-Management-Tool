import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import { useHistory } from "react-router";
import { Store } from "react-notifications-component";

export default function AllDocuments() {
  const [docList, setDocList] = useState([]);
  const history = useHistory();

  //User authentication
  function authenticate() {
    if (
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Supervisor" &&
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Co-Supervisor" &&
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Panel Member"
    ) {
      history.push("/login");
      Store.addNotification({
        title: "You are not allowed!",
        message:
          "You are not allowed to access this page! Please login as Supervisor, Co-Supervisor or Panel Member",
        animationIn: ["animate_animated", "animate_fadeIn"],
        animationOut: ["animate_animated", "animate_fadeOut"],
        type: "danger",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 3500,
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
      .get(`https://research-management-tool-ym.herokuapp.com/document/`)
      .then((res) => {
        setDocList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Can't get Document details ");
      });
  }, []);

  const setData = (data) => {
    console.log("data", data);
    let { GroupID, ResearchField, Document, ResearchTopic, DocType, _id } =
      data;
    localStorage.setItem("Group_ID", GroupID);
    localStorage.setItem("Research_Field", ResearchField);
    localStorage.setItem("rTopic", ResearchTopic);
    localStorage.setItem("Link", Document);
    localStorage.setItem("DocType", DocType);
    localStorage.setItem("DocID", _id);
    if (data.DocType == "Topic Details Document") {
      history.push("/EvaluateTopic");
    } else {
      history.push("/Doc");
    }
    h;
  };

  return (
    <div className="allDoc_body_container">
      {/*left side column */}
      <div className="left_container"></div>

      {/*right side column */}
      <div className="allDoc_right_container">
        <div>
          <label className="h-text text_space" style={{ color: "#FF5631" }}>
            SUBMITTED
          </label>
          <br />
          <label className="h-text">RESEARCH DOCUMENTS / PRESENTATIONS</label>
        </div>
        <div className="allDoc_box mb-5 ">
          <table className="table table-hover table-borderless">
            <thead>
              {/* <tr style={{ height: "50px" }}>
                <th scope="col">Group ID</th>
                <th scope="col">Research Field</th>
                <th scope="col">Submission Type </th>
                <th scope="col">Comment</th>
                <th scope="col"></th>
              </tr> */}
            </thead>
            <tbody>
              <tr style={{ height: "80px" }}>
                <th scope="col">Group ID</th>
                <th scope="col">Research Field</th>
                <th scope="col">Submission Type </th>
                <th scope="col">Comment</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
              {docList?.map((docList, index) => (
                <tr key={index} className="" style={{ height: "80px" }}>
                  <td>{docList.GroupID}</td>
                  <td>{docList.ResearchField}</td>
                  {docList.DocType == "Proposal Presentation" ||
                  docList.DocType == "Progress Presentation" ||
                  docList.DocType == "Final Presentation" ? (
                    <td className=" fw-bold" style={{ color: "blue" }}>
                      {docList.DocType}
                    </td>
                  ) : (
                    <td className=" fw-bold">{docList.DocType}</td>
                  )}

                  <td>{docList.Comment}</td>
                  {docList.Status == "Pending" ? (
                    <td className="text-danger fw-bold">{docList.Status}</td>
                  ) : (
                    <td className="text-success fw-bold">{docList.Status}</td>
                  )}
                  {docList.Status == "Pending" ? (
                    <td>
                      <button
                        type="submit"
                        className="btn allDoc_button "
                        style={{ cursor: "pointer" }}
                        onClick={() => setData(docList)}
                      >
                        Evaluate
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        disabled
                        type="submit"
                        className="btn evaluate_btn"
                        onClick={() => setData(docList)}
                      >
                        Evaluate
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
