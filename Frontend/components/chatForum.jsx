import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Store } from "react-notifications-component";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function chatForum() {
  // const [groupID, setGroupID] = useState();
  const [stdName, setStdName] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [stdEmail, setStdEmail] = useState();
  const [allMsg, setAllMsg] = useState();
  const [group_id, setGroup_id] = useState();
  const [leaderEmail, setLeaderEmail] = useState();
  const [replyMsg, setReplyMsg] = useState();
  let groupID;

  useEffect(() => {
    setStdEmail(JSON.parse(localStorage.getItem("user")).email);
    setStdName(JSON.parse(localStorage.getItem("user")).name);

    //get group _id and leader's email by student email
    const emailID = axios
      .get(
        `https://research-management-tool-ym.herokuapp.com/stdGroup/${
          JSON.parse(localStorage.getItem("user")).email
        }`
      )
      .then((res) => {
        setGroup_id(res.data._id);

        setLeaderEmail(res.data.Group_Leader_Email);
      })
      .catch((err) => {});
  }, []);

  const getAllMsg = async () => {
    //get messages from db
    const allChat = await axios
      .get(`https://research-management-tool-ym.herokuapp.com/chat/${group_id}`)
      .then((res) => {
        setAllMsg(res.data);
      })
      .catch((err) => {});
  };

  const getAllReply = async () => {
    //get messages from db
    const allReplys = await axios
      .get(`https://research-management-tool-ym.herokuapp.com/chatReplies/group/replyMsgs`)
      .then((res) => {
        setReplyMsg(res.data);
      })
      .catch((err) => {});
  };

  const deleteMsg = async (e, id) => {
    e.preventDefault();
    console.log("id", id);

    let ans = window.confirm("Do you want to delete this request ?");

    if (ans) {
      await axios.delete(`https://research-management-tool-ym.herokuapp.com/chat/${id}`).then((res) => {
        console.log(res);
      });
    }
  };
  getAllMsg();
  getAllReply();

  const handleNewMessage = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://research-management-tool-ym.herokuapp.com/topic/groupID/${leaderEmail}`)
      .then((res) => {
        groupID = res.data;
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("GroupID", groupID);
    const newMessage = {
      group_id,
      groupID,
      stdName,
      stdEmail,
      subject,
      message,
    };
    console.log("newMessage", newMessage);
    //send message to the db
    await axios.post(`https://research-management-tool-ym.herokuapp.com/chat/`, newMessage).then(() => {
      Store.addNotification({
        title: "message send successfully",
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

      e.target.reset();
    });

    //get messages from db
    // axios.get(`https://research-management-tool-ym.herokuapp.com/chat/${group_id}`).then((res) => {
    //   setAllMsg(res.data);
    //   console.log(res.data);
    // });
    getAllMsg();
  };
  return (
    <div className="body_container">
      {/*left side column */}
      <div className="left_container">
        <div>
          <label className="h-text text_space" style={{ color: "#FF5631" }}>
            CHAT
          </label>
          <br />
          <label className="h-text mb-5 ms-5" style={{ color: "#ffffff" }}>
            FORUM
          </label>
        </div>
        <form className=" pe-5" onSubmit={handleNewMessage}>
          <div className=" mb-5 ">
            <label>Subject</label>
            <input
              required
              type="text"
              className="form-control"
              id="researchTopic"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="form-group mb-5">
            <label>Message</label>
            <textarea
              required
              className="form-control"
              id="groupMembers"
              rows={5}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-success ">
            Add a new Discussion
          </button>
        </form>
      </div>

      {/*right side column */}
      <div className="right_container">
        {allMsg?.map((allMsg, index) => (
          <div key={index}>
            <Card className="mb-3 mt-5" style={{ backgroundColor: "#918CAB" }}>
              <Card.Header>{allMsg.stdName}</Card.Header>
              <Card.Body>
                <Card.Title>{allMsg.subject}</Card.Title>
                <Card.Text>
                  <p>{allMsg.createdAt}</p>
                  {allMsg.message}
                </Card.Text>
                <div style={{ marginLeft: "550px" }}>
                  <a
                    type="number"
                    min="0"
                    max="25"
                    className="form-control "
                    style={{
                      width: "70px",
                      backgroundColor: "#918CAB",
                      border: "none",
                    }}
                    onClick={(e) => deleteReply(e, replyMsg._id)}
                  >
                    <DeleteForeverIcon
                      fontSize="large"
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                        color: "#BB2D3B",
                        disabled: false,
                      }}
                    />
                  </a>
                  {/* <Button
                    variant="danger"
                    onClick={(e) => deleteMsg(e, allMsg._id)}
                    style={{ marginLeft: "500px" }}
                  >
                    Delete
                  </Button> */}
                </div>
              </Card.Body>
            </Card>
            <div className="ps-5">
              {replyMsg?.map((replyMsg, index) => (
                <div key={index}>
                  {allMsg._id === replyMsg.messageID ? (
                    <Card
                      className="mb-3"
                      style={{ backgroundColor: "#ece9ff" }}
                    >
                      <Card.Body>
                        <Card.Text>
                          <p>{replyMsg.createdAt}</p>
                          <p>
                            <b>Reply by:</b> {replyMsg.userSup}
                          </p>
                          <p className="ms-4">{replyMsg.message}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
