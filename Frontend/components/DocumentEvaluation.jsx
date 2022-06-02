import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Styles/styles.css";

export default function DocumentEvaluation() {
  const [groupID, setGroupID] = useState();
  const [researchTopic, setResearchTopic] = useState();
  const [link, setLink] = useState();
  const [markingCriteria, setMarkingCriteria] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [total, setTotal] = useState(0);
  const [rounds, setRounds] = useState();

  useEffect(() => {
    setGroupID(localStorage.getItem("Group_ID"));
    setResearchTopic(localStorage.getItem("rTopic"));
    setLink(localStorage.getItem("Link"));

    console.log("localStorage.getItem()", localStorage.getItem("Link"));

    axios
      .get(
        `http://localhost:8070/markingScheme/one/${localStorage.getItem(
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
        alert(err);
      });
  }, []);

  const handleChangeInput = (e, index) => {
    setInputValue({ ...inputValue, [index]: e.target.value });
  };

  const handleGetTotal = (e) => {
    e.preventDefault();
    console.log("inputValue", inputValue, "count ", criteria.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const N = inputValue.map((value, index) =>
      console.log("value", value.index)
    );

    console.log("N", N);
    //const total = inputValue.map((inputValue) => Number(inputValue.{index}) )
    //   console.log("total", total);
  };

  return (
    <div className="body_container">
      {/*left side column */}
      <div className="left_container">
        <div>
          <label className="h-text text_space" style={{ color: "#FF5631" }}>
            DOCUMENT
          </label>
          <br />
          <label className="h-text" style={{ color: "#ffffff" }}>
            EVALUATION
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
            <div className="criteria_box mb-4 fw-bold">
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
                      <th scope="col" className="col-2">
                        Given Marks
                      </th>
                      <th scope="col" className="col-2"></th>
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
                            className="form-control"
                            onChange={(e) => handleChangeInput(e, index)}
                          />
                        </td>
                        {/* <td>
                          <div className="ps-5 ">
                            <button type="submit" className="form-control">
                              Add
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ul>
          {/* Total marks */}
          <div className="form-group row mb-4 criteria_row ps-5 fw-bold fs-4">
            <div className="col">
              <label>Total Marks </label>
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
            <div className="col-3 ps-4">
              <label>100</label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success btn_submit mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
