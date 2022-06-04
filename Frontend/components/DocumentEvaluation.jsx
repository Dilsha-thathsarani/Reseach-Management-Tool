import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Styles/styles.css";
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";

export default function DocumentEvaluation() {
  const [groupID, setGroupID] = useState();
  const [researchTopic, setResearchTopic] = useState();
  const [link, setLink] = useState();
  const [markingCriteria, setMarkingCriteria] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [evaluatedBy, setEvaluatedBy] = useState([]);
  const [Doctype, setDoctype] = useState();
  const [docID, setDocID] = useState();
  const [Status, setStatus] = useState();
  const history = useHistory();

  //Supervisor, co-supervisor authentication
  function DocumentAuthenticate() {
    if (
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Supervisor" &&
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Co-Supervisor"
    ) {
      history.push("/allDoc");
      Store.addNotification({
        title: "You are not allowed Documentation Evaluation!",
        message:
          "You are not allowed to access this page! Please login as Supervisor, Co-Supervisor",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
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

  //Panel Member authentication
  function presentationAuthenticate() {
    if (
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
      "Panel Member"
    ) {
      history.push("/allDoc");
      Store.addNotification({
        title: "You are not allowed to Presentation Evaluation!",
        message:
          "You are not allowed to access this page! Please login as Panel Member",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
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
    setGroupID(localStorage.getItem("Group_ID"));
    setResearchTopic(localStorage.getItem("rTopic"));
    setLink(localStorage.getItem("Link"));
    setEvaluatedBy(JSON.parse(localStorage.getItem("user")).name);
    setDoctype(localStorage.getItem("DocType"));
    setDocID(localStorage.getItem("DocID"));

    if (
      localStorage.getItem("DocType") == "Proposal Presentation" ||
      localStorage.getItem("DocType") == "Progress Presentation" ||
      localStorage.getItem("DocType") == "Final Presentation"
    ) {
      setTimeout(() => {
        presentationAuthenticate();
      }, 0);
      axios
        .get(
          `https://research-management-tool-ym.herokuapp.com/markingScheme/one/${localStorage.getItem(
            "Research_Field"
          )}/${"Presentation"}`
        )
        .then((res) => {
          console.log("res.data", res.data);
          let { _id, sid, specialization, schemeType, marks, criteria } =
            res.data;
          setMarkingCriteria(criteria);
        })
        .catch((err) => {
          Store.addNotification({
            title: "Not found the Marking Schema !",
            message:
              "Please contact the system administrator to add the Marking Schema",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            type: "danger",
            insert: "top",
            container: "top-center",

            dismiss: {
              duration: 19500,

              showIcon: true,
              click: false,
            },

            width: 500,
          });
        });
    } else {
      setTimeout(() => {
        DocumentAuthenticate();
      }, 0);
      axios
        .get(
          `https://research-management-tool-ym.herokuapp.com/markingScheme/one/${localStorage.getItem(
            "Research_Field"
          )}/${"Document"}`
        )
        .then((res) => {
          console.log("res.data", res.data);
          let { _id, sid, specialization, schemeType, marks, criteria } =
            res.data;
          setMarkingCriteria(criteria);
        })
        .catch((err) => {
          Store.addNotification({
            title: "Not found the Marking Schema !",
            message:
              "Please contact the system administrator to add the Marking Schema",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            type: "danger",
            insert: "top",
            container: "top-center",

            dismiss: {
              duration: 19500,

              showIcon: true,
              click: false,
            },

            width: 500,
          });
        });
    }
  }, []);

  const handleChangeInput = (e, index) => {
    setInputValue({ ...inputValue, [index]: e.target.valueAsNumber });
  };

  const handleGetTotal = (e) => {
    e.preventDefault();
    setTotal(
      Object.values(inputValue).reduce((total, value) => total + value, 0)
    );
    console.log("total", total);

    setStatus(
      "Graded: " +
        Object.values(inputValue).reduce((total, value) => total + value, 0) +
        "%"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Status", Status);

    const newEvaluation = {
      groupID,
      Doctype,
      researchTopic,
      total,
      evaluatedBy,
    };

    await axios
      .post("https://research-management-tool-ym.herokuapp.com/evaluation/document", newEvaluation)
      .then(() => {
        Store.addNotification({
          title: "Evaluation Successful",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          type: "default",
          insert: "top",
          container: "top-right",

          dismiss: {
            duration: 1500,
            onScreen: true,
            showIcon: true,
          },

          width: 400,
        });
      })
      .catch((err) => {
        alert(err);
      });

    const Update = {
      Status,
    };

    //Update document status
    await axios
      .put(`https://research-management-tool-ym.herokuapp.com/document/status/${docID}`, Update)
      .then(() => {
        history.push("/allDoc");
      });
  };

  return (
    <div className="Docbody_container">
      {/*left side column */}
      <div className="Docleft_container">
        <div>
          <label
            className="h-text text_space"
            style={{
              color: "#FF5631",
              textTransform: "uppercase",
              lineHeight: "0.9",
            }}
          >
            {localStorage.getItem("DocType")}
          </label>
          <br />
          <label className="h-text mt-4" style={{ color: "#ffffff" }}>
            EVALUATE
          </label>
        </div>
        <form>
          <div className="form-group mb-3 mt-5">
            <label>Group ID</label>
            <input
              type="text"
              disabled
              className="form-control"
              id="groupID"
              value={groupID}
            />
          </div>

          <div className="form-group mb-3">
            <label>Research Topic</label>
            <input
              type="text"
              disabled
              className="form-control"
              id="researchTopic"
              value={researchTopic}
            />
          </div>
          {/* <div className="form-group mb-5">
            <label>Group Members</label>
            <textarea
              className="form-control"
              disabled
              id="groupMembers"
              rows={4}
            />
          </div> */}
          <a href={link} className="btn btn-success ">
            Download Document
          </a>
        </form>
      </div>

      {/*right side column */}
      <div className="right_container">
        <form>
          <ul className="list-group">
            <div className="criteria_box mb-4">
              <div className="form-group row mb-4 criteria_row">
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="col-2">
                        No
                      </th>
                      <th scope="col" className="col">
                        Criteria Name
                      </th>
                      <th scope="col" className="col">
                        Total Marks
                      </th>
                      <th scope="col" className="col-1">
                        Marks
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markingCriteria?.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td> {data.des}</td>
                        <td className="ps-3">{data.mark}</td>
                        <td>
                          <input
                            type="number"
                            min={0}
                            max={data.mark}
                            className="form-control"
                            onChange={(e) => handleChangeInput(e, index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ul>
          {/* Total marks */}
          <div style={{ paddingLeft: "90px" }}>
            <table className="m-5">
              <tbody>
                <tr>
                  <td>
                    <label>
                      <b>Total Marks </b>
                    </label>{" "}
                  </td>
                  <td className="ps-3">
                    <label>
                      <b>{total}%</b>
                    </label>
                  </td>
                  <td className="ps-5">
                    <button
                      type="submit"
                      className="col btn btn-success btn_total mt-3"
                      onClick={handleGetTotal}
                    >
                      <b> Get Total</b>
                    </button>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="col btn btn-success btn_submit mt-3"
                      onClick={handleSubmit}
                    >
                      <b> Submit</b>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="form-group row mb-4 criteria_row ps-5 fw-bold fs-4">
            <div className="col">
              <label>Total Marks </label>
            </div>
            <div className="col-3 ps-4">
              <label>{total}</label>
            </div>
            <div className="col">
              <button
                type="submit"
                className="form-control"
                onClick={handleGetTotal}
              >
                Get Total
              </button>
            </div>
            <button
              type="submit"
              className="col btn btn-success btn_submit mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
