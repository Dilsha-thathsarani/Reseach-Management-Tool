import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import { useHistory } from "react-router";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Store } from "react-notifications-component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default function chatGroupSupervisor() {
  const [allMsg, setAllMsg] = useState();
  const [replyMsg, setReplyMsg] = useState();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [messageID, setMessageID] = useState();
  const [message, setMessage] = useState();
  const [userSup, setUserSup] = useState();

  //User authentication
  function authenticate() {
    if (
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Supervisor" &&
      JSON.parse(localStorage.getItem("user") || "[]").user_role !=
        "Co-Supervisor"
    ) {
      history.push("/login");
      Store.addNotification({
        title: "You are not allowed!",
        message:
          "You are not allowed to access this page! Please login as Supervisor or Co-Supervisor",
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
    setTimeout(() => {
      authenticate();
    }, 0);
    setUserSup(JSON.parse(localStorage.getItem("user")).name);
    //get messages from db
    const getAllMsg = async () => {
      const allChat = await axios
        .get(`http://localhost:8070/chat/`)
        .then((res) => {
          setAllMsg(res.data);
        })
        .catch((err) => {});
    };

    //get replies from db
    const getAllReply = async () => {
      const allReplys = await axios
        .get(`http://localhost:8070/chatReplies/group/replyMsgs`)
        .then((res) => {
          setReplyMsg(res.data);
        })
        .catch((err) => {});
    };
    getAllReply();
    getAllMsg();
  }, []);

  //delete message
  const deleteMsg = async (e, id) => {
    e.preventDefault();
    console.log("id", id);

    let ans = window.confirm("Do you want to delete this message ?");

    if (ans) {
      await axios.delete(`http://localhost:8070/chat/${id}`).then((res) => {
        console.log(res);
        window.location.reload(false);
      });
    }
  };

  //delete reply
  const deleteReply = async (e, id) => {
    e.preventDefault();
    console.log("id", id);

    let ans = window.confirm("Do you want to delete this reply ?");

    if (ans) {
      await axios
        .delete(`http://localhost:8070/chatReplies/${id}`)
        .then((res) => {
          console.log(res);
          window.location.reload(false);
        });
    }
  };

  const handleReply = (e, id) => {
    e.preventDefault();
    console.log(id);
    setMessageID(id);
    setModal(true);

    console.log(messageID);
  };

  const handelSendReplyModal = async (e) => {
    e.preventDefault();
    console.log("message", message);
    console.log("mID", messageID);
    console.log("userSup", userSup);

    await axios
      .post(`http://localhost:8070/chatReplies`, {
        userSup,
        messageID,
        message,
      })
      .then((res) => {
        window.location.reload(false);
      });
  };

  return (
    <div className="allDoc_body_container">
      {/*left side column */}
      <div className="left_container"></div>

      {/* Popup modal */}
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          <h3>Reply to message</h3>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handelSendReplyModal}>
            <div className="form-group mb-3">
              <label>Reply</label>
              <textarea
                required
                className="form-control"
                id="groupMembers"
                rows={4}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success ">
                Send
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      {/*right side column */}
      <div className="right_container">
        {allMsg?.map((allMsg, index) => (
          <div key={index}>
            {console.log("allMsg", allMsg)}
            <div className="p-5">
              <h3>{allMsg.groupID}</h3>

              <Card className="mb-1 mt-5">
                <Card.Header>{allMsg.stdName}</Card.Header>
                <Card.Body>
                  <Card.Title>{allMsg.subject}</Card.Title>
                  <Card.Text>{allMsg.message}</Card.Text>
                  <div className="modal-footer">
                    {/* <Button
                      className="me-5"
                      style={{ backgroundColor: "#0f0934" }}
                      onClick={(e) => handleReply(e, allMsg._id)}
                    >
                      Reply
                    </Button> */}
                    <Button
                      className="me-5"
                      style={{ backgroundColor: "#0f0934" }}
                      onClick={(e) => handleReply(e, allMsg._id)}
                    >
                      Reply
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-5"
                      onClick={(e) => deleteMsg(e, allMsg._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="p-5">
              <div className="ms-5">
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
                          <div className="modal-footer">
                            <Button
                              variant="danger"
                              onClick={(e) => deleteReply(e, replyMsg._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
