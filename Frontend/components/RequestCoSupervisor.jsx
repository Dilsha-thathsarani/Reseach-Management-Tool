import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

export default function RequestCoSupervisor() {
  const [groupID, setGroupID] = useState();
  const [topic, setTopic] = useState();
  const [researchField, setResearchField] = useState();
  const [coSupervisor, setCoSupervisor] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setGroupID(localStorage.getItem("groupID"));
    setTopic(localStorage.getItem("rTopic"));
    setResearchField(localStorage.getItem("rField"));

    //get supervisor details
    axios
      .get(
        `https://research-management-tool-ym.herokuapp.com/supervisor/co/${localStorage.getItem(
          "rField"
        )}/${"Co-Supervisor"}`
      )
      .then((res) => {
        console.log(res.data);
        setCoSupervisor(res.data);
      });

    //get request details
    axios
      .get(`https://research-management-tool-ym.herokuapp.com/request/${localStorage.getItem("groupID")}`)
      .then((res) => {
        console.log("requested ", res.data.requested);
        setStatus(res.data.requested);
      });
  }, []);

  const handlerSend = async (data) => {
    var { email } = data;

    const newRequest = {
      groupID,
      researchField,
      topic,
      email,
    };

    let ans = window.confirm("Do you want to send this request ?");

    if (ans) {
      await axios
        .post(`https://research-management-tool-ym.herokuapp.com/request/`, newRequest)
        .then(() => {
          alert("Request sent successfully");
          setStatus("send");
        })
        .catch((err) => {
          alert(err);
        });

      //get request details
      await axios
        .get(`https://research-management-tool-ym.herokuapp.com/request/${localStorage.getItem("groupID")}`)
        .then((res) => {
          console.log("request details ", res.data);
          setStatus(res.data.requested);
        });
    }
  };

  return (
    <div className="body_container">
      {/*left side column */}
      <div className="left_container">
        <div>
          <label className="h-text text_space" style={{ color: "#FF5631" }}>
            REQUEST
          </label>
          <br />
          <label className="h-text mb-5" style={{ color: "#ffffff" }}>
            CO-SUPERVISOR
          </label>
        </div>
        <form className=" pe-5">
          <div className="form-group mb-3 mt-5">
            <label>Group ID</label>
            <input
              type="text"
              value={groupID}
              disabled
              className="form-control"
              id="groupID"
            />
          </div>

          <div className="form-group mb-3">
            <label>Research Topic</label>
            <input
              type="text"
              value={topic}
              disabled
              className="form-control"
              id="researchTopic"
            />
          </div>
          <div className=" mb-5 ">
            <label>Research Field</label>
            <input
              type="text"
              value={researchField}
              disabled
              className="form-control"
              id="researchTopic"
            />
          </div>
        </form>
      </div>

      {/*right side column */}
      <div className="right_container">
        <ul className="list-group">
          <div
            className=" mb-5"
            style={{
              borderRadius: "10px",
              border: "1px solid #9b97b6",
              backgroundColor: "#ece9ff",
              padding: " 30px 30px",
              width: "650px",
              height: "450px",
              overflow: "scroll",
              overflowX: " hidden",
            }}
          >
            <div className="form-group row mb-4 criteria_row">
              <table className="table-hover ms-4">
                <thead>
                  <tr>
                    <th scope="col" className="col">
                      No
                    </th>
                    <th scope="col" className="col-2 ps-5">
                      Name
                    </th>
                    <th scope="col" className="col ms-5">
                      <center>Email</center>
                    </th>
                    <th scope="col-1" className="col-5"></th>
                  </tr>
                </thead>

                <tbody>
                  {coSupervisor?.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className=" ps-5 pe-3"> {data.name}</td>
                      <td className="ps-5">{data.email}</td>
                      <td>
                        <center>
                          {status ? (
                            <div className="col-3 ms-5 ">
                              <a
                                type="number"
                                min="0"
                                max="25"
                                className="form-control "
                                style={{
                                  width: "70px",
                                  backgroundColor: "#ece9ff",
                                  border: "none",
                                }}
                              >
                                <div className="ps-2 ">
                                  <SendIcon
                                    fontSize="large"
                                    sx={{
                                      "&:hover": {
                                        color: "#AAAAAA",
                                      },
                                      color: "#AAAAAA",
                                      disabled: false,
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          ) : (
                            <div className="col-3 ms-5 ">
                              <a
                                type="number"
                                min="0"
                                max="25"
                                className="form-control "
                                style={{
                                  width: "70px",
                                  backgroundColor: "#ece9ff",
                                  border: "none",
                                }}
                                onClick={(e) => handlerSend(data)}
                              >
                                <div className="ps-2 ">
                                  <SendIcon
                                    fontSize="large"
                                    sx={{
                                      "&:hover": {
                                        color: "#00D8B6",
                                      },
                                      color: "green",
                                      disabled: false,
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          )}
                        </center>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
