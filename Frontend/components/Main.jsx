import "./CSS/topicsub.css";
import "./CSS/btrap.css";

import {
  MDBAccordion,
  MDBAccordionItem,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBCardOverlay,
  MDBCardHeader,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  MDBAccordion,
  MDBAccordionItem,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBCardOverlay,
  MDBCardHeader,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Featured from "./Featured";

export default function Main() {
  const [userdata, setUserdata] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user") || "[]"));
    console.log("USer Role", userdata.user_role);
  }, []);

  if (JSON.parse(localStorage.getItem("user") || "[]").user_role == null) {
    history.push("/login");
  } else if (
    JSON.parse(localStorage.getItem("user") || "[]").user_role == "Student"
  ) {
    return (
      <div className="main-m-container">
        <div className="main-item-con"></div>
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Featured />
          <div className="main-side-container">
            <div className="main-side-sub-container">
              <center>
                <label className="main-t-lbl">
                  {" "}
                  <label style={{ color: "#FF5631" }}>Quick</label> Links
                </label>
              </center>
              <center>
                <a href="/StudentGroup">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Register Group
                  </button>
                </a>{" "}
                <br />
                <a href="/SubmitTopic">
                  <button className="btn l-btn-accepted main-side-button">
                    Register Topic
                  </button>
                </a>{" "}
                <br />
                <a href="/SubmitDocs">
                  <button className="btn l-btn-accepted main-side-button">
                    Submit Document
                  </button>
                </a>{" "}
                <br />
                <a href="/DownloadTemplate">
                  <button className="btn l-btn-accepted main-side-button">
                    Download Templates
                  </button>
                </a>
                <a href="/profile">
                  <button className="btn l-btn-accepted main-side-button2">
                    My Profile
                  </button>
                </a>
                <label>Have a question? write us to info@sliit.lk</label>
              </center>
            </div>
          </div>
          <div className="main-cd-container">
            <div className="main-color-cards">
              <MDBCard
                background="primary"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Submission</MDBCardTitle>
                  <MDBCardText>
                    Research Project Topic Submission deadline has extended to
                    27th August 2022.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="main-color-cards2">
              <MDBCard
                background="danger"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Faculty</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>On-Campus Evaluations</MDBCardTitle>
                  <MDBCardText>
                    All the on-campus evaluations has been canceled until
                    further notice. Check notices regulary
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="success"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Update</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                  <MDBCardText>
                    All submitted research topics have been evaluated by the
                    supervisors. Check your topic status.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="warning"
                className="mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Document Templates</MDBCardTitle>
                  <MDBCardText>
                    Latest Document templates are available for download in the
                    Research Management Tool. (2022 Version)
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <MDBAccordion flush initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Register Your Group"
              >
                Group registration is only available to groups of 4 delegates.
                If a group is smaller than this, then individual registration is
                available online for each delegate. All fields marked (*) are
                required for administration and must be completed so that we can
                process your group effectively, and to collect the appropriate
                information for registration. This will be used for the
                evaluation and certificate process after the research.
                <br />
                <br />
                <a href="/StudentGroup">
                  <button className="btn btn-primary">Register Group</button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Get Topic Approval">
                All groups are Advice to register with their topic details. The
                topic details will be used for the evaluation and certificate
                process after the research. A supervisor will check your
                research topic and will approve or reject your research topic.
                If your topic has been regected, you can re register with a
                different topic. You will recive an email when the topic has
                been approved or rejected.
                <br />
                <br />
                <a href="/SubmitTopic">
                  <button className="btn btn-primary">Submit Topic</button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={3} headerTitle="Check Topic Status">
                Students are advised to check their topic status. If your topic
                has been approved, you will recive an email when the topic has
                been approved. If your topic has been rejected, you can re
                register with a different topic. A supervisor will check your
                research topic and will approve or reject your research topic.
                You can edit the topic details before review.
                <br />
                <br />
                <a href="/StdTopicList">
                  <button className="btn btn-primary">Topic List</button>
                </a>
              </MDBAccordionItem>

              <MDBAccordionItem
                collapseId={4}
                headerTitle="Check Submitted Documents"
              >
                Students are advised to check their topic status. If your topic
                has been approved, you will recive an email when the topic has
                been approved. If your topic has been rejected, you can re
                register with a different topic. A supervisor will check your
                research topic and will approve or reject your research topic.
                You can edit the topic details before review.
                <br />
                <br />
                <a href="/AllSubmitDoc">
                  <button className="btn btn-primary">View Documents</button>
                </a>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img1_irqbi5.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Register Groups</MDBCardTitle>
                    <MDBCardText>
                      You can now register your group easily through Research
                      Management Tool. No need to fill physical papers of forms.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img2_c1v6ul.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Submit Document</MDBCardTitle>
                    <MDBCardText>
                      No need to hand over your documents physically. You can
                      submit your documents online using Research Management
                      Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010221/img3_w41n4j.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Get Evaluated</MDBCardTitle>
                    <MDBCardText>
                      Marking is no longer physical. All the assesments can be
                      done through Research Management Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>

          <MDBFooter className="text-center" color="white" bgColor="dark">
            <MDBContainer className="p-4">
              <section className="">
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>

                    <MDBCol md="5" start="12">
                      <MDBInput
                        contrast
                        type="email"
                        label="Email address"
                        className="mb-4"
                      />
                    </MDBCol>

                    <div className="col-auto">
                      <MDBBtn
                        outline
                        color="light"
                        type="submit"
                        className="mb-4"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </section>

              <section className="mb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </section>
            </MDBContainer>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">
                ResearchManagement.com
              </a>
            </div>
          </MDBFooter>
        </div>
        <div style={{ backgroundColor: "#84809F" }}></div>
      </div>
    );
  } else if (
    JSON.parse(localStorage.getItem("user") || "[]").user_role == "Admin"
  ) {
    return (
      <div className="main-m-container">
        <div className="main-item-con"></div>
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Featured />
          <div className="main-side-container">
            <div className="main-side-sub-container">
              <center>
                <label className="main-t-lbl">
                  {" "}
                  <label style={{ color: "#FF5631" }}>Admin</label> Links
                </label>
              </center>
              <center>
                <a href="/allprof">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    User Management
                  </button>
                </a>{" "}
                <br />
                <a href="/panelmembers">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Assign Pannel Members
                  </button>
                </a>{" "}
                <br />
                <a href="/Allcreatetypes">
                  <button className="btn l-btn-accepted main-side-button">
                    Add Submission Types
                  </button>
                </a>{" "}
                <br />
                <a href="/AddMarking">
                  <button className="btn l-btn-accepted main-side-button">
                    Create Marking
                  </button>
                </a>{" "}
                <br />
                <a href="/MarkingList">
                  <button className="btn l-btn-accepted main-side-button">
                    Marking List
                  </button>
                </a>
              </center>
            </div>
          </div>
          <div className="main-cd-container">
            <div className="main-color-cards">
              <MDBCard
                background="primary"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Submission</MDBCardTitle>
                  <MDBCardText>
                    Research Project Topic Submission deadline has extended to
                    27th August 2022.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="main-color-cards2">
              <MDBCard
                background="danger"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Faculty</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>On-Campus Evaluations</MDBCardTitle>
                  <MDBCardText>
                    All the on-campus evaluations has been canceled until
                    further notice. Check notices regulary
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="success"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Update</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                  <MDBCardText>
                    All submitted research topics have been evaluated by the
                    supervisors. Check your topic status.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="warning"
                className="mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Document Templates</MDBCardTitle>
                  <MDBCardText>
                    Latest Document templates are available for download in the
                    Research Management Tool. (2022 Version)
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <MDBAccordion flush initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Manage users in system"
              >
                You are responsible to manage all users in the system. You can
                add, edit, delete users. You can view a complete list of users.
                All users have a name, phone number, email address, and a role
                etc. Roles are different from each users. Be careful with user
                roles.
                <br />
                <br />
                <a href="/allprof">
                  <button className="btn btn-primary">All Profiles</button>
                </a>
                <a href="/AllStudentGroup">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    All Student Groups
                  </button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Marking Schemes">
                Admins should create marking schemes for evaluations. Marking
                schemes are different from each research topic. You can create
                marking schemes, edit marking schemes, and delete marking
                schemes. You can get a pdf from the edit view of the marking
                scheme.
                <br />
                <br />
                <a href="/AddMarking">
                  <button className="btn btn-primary">
                    Create Marking Scheme
                  </button>
                </a>
                <a href="/MarkingList">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    All Marking Schemes
                  </button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={3}
                headerTitle="Document Submission"
              >
                Admins can upload document templates for the research topics.
                Document templates are different from each research topic. You
                can upload document templates, edit document templates, and
                delete document templates.
                <br />
                <br />
                <a href="/UploadTemplate">
                  <button className="btn btn-primary">New Template</button>
                </a>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img1_irqbi5.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Register Groups</MDBCardTitle>
                    <MDBCardText>
                      You can now register your group easily through Research
                      Management Tool. No need to fill physical papers of forms.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img2_c1v6ul.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Submit Document</MDBCardTitle>
                    <MDBCardText>
                      No need to hand over your documents physically. You can
                      submit your documents online using Research Management
                      Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010221/img3_w41n4j.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Get Evaluated</MDBCardTitle>
                    <MDBCardText>
                      Marking is no longer physical. All the assesments can be
                      done through Research Management Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>

          <MDBFooter className="text-center" color="white" bgColor="dark">
            <MDBContainer className="p-4">
              <section className="">
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>

                    <MDBCol md="5" start="12">
                      <MDBInput
                        contrast
                        type="email"
                        label="Email address"
                        className="mb-4"
                      />
                    </MDBCol>

                    <div className="col-auto">
                      <MDBBtn
                        outline
                        color="light"
                        type="submit"
                        className="mb-4"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </section>

              <section className="mb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </section>
            </MDBContainer>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">
                ResearchManagement.com
              </a>
            </div>
          </MDBFooter>
        </div>
        <div style={{ backgroundColor: "#84809F" }}></div>
      </div>
    );
  } else if (
    JSON.parse(localStorage.getItem("user") || "[]").user_role ==
      "Supervisor" ||
    JSON.parse(localStorage.getItem("user") || "[]").user_role ==
      "Co-Supervisor"
  ) {
    return (
      <div className="main-m-container">
        <div className="main-item-con"></div>
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Featured />
          <div className="main-side-container">
            <div className="main-side-sub-container">
              <center>
                <label className="main-t-lbl">
                  {" "}
                  <label style={{ color: "#FF5631" }}>Supervisor</label> Links
                </label>
              </center>
              <center>
                <a href="/TopicList">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Topic Review
                  </button>
                </a>{" "}
                <br />
                <a href="/allDoc">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Evaluate Documents
                  </button>
                </a>{" "}
                <br />
                <a href="/chatgroup">
                  <button className="btn l-btn-accepted main-side-button">
                    Go to Chat
                  </button>
                </a>{" "}
                <br />
                <a href="/profile">
                  <button className="btn l-btn-accepted main-side-button2">
                    My profile
                  </button>
                </a>
              </center>
            </div>
          </div>
          <div className="main-cd-container">
            <div className="main-color-cards">
              <MDBCard
                background="primary"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Submission</MDBCardTitle>
                  <MDBCardText>
                    Research Project Topic Submission deadline has extended to
                    27th August 2022.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="main-color-cards2">
              <MDBCard
                background="danger"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Faculty</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>On-Campus Evaluations</MDBCardTitle>
                  <MDBCardText>
                    All the on-campus evaluations has been canceled until
                    further notice. Check notices regulary
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="success"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Update</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                  <MDBCardText>
                    All submitted research topics have been evaluated by the
                    supervisors. Check your topic status.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="warning"
                className="mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Document Templates</MDBCardTitle>
                  <MDBCardText>
                    Latest Document templates are available for download in the
                    Research Management Tool. (2022 Version)
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <MDBAccordion flush initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Manage users in system"
              >
                You are responsible to manage all users in the system. You can
                add, edit, delete users. You can view a complete list of users.
                All users have a name, phone number, email address, and a role
                etc. Roles are different from each users. Be careful with user
                roles.
                <br />
                <br />
                <a href="/allprof">
                  <button className="btn btn-primary">All Profiles</button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Marking Schemes">
                Admins should create marking schemes for evaluations. Marking
                schemes are different from each research topic. You can create
                marking schemes, edit marking schemes, and delete marking
                schemes. You can get a pdf from the edit view of the marking
                scheme.
                <br />
                <br />
                <a href="/AddMarking">
                  <button className="btn btn-primary">
                    Create Marking Scheme
                  </button>
                </a>
                <a href="/MarkingList">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    All Marking Schemes
                  </button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={3}
                headerTitle="Document Submission"
              >
                Admins can upload document templates for the research topics.
                Document templates are different from each research topic. You
                can upload document templates, edit document templates, and
                delete document templates.
                <br />
                <br />
                <a href="/UploadTemplate">
                  <button className="btn btn-primary">New Template</button>
                </a>
                <a href="/SubmitDocs">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    Upload Document
                  </button>
                </a>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img1_irqbi5.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Register Groups</MDBCardTitle>
                    <MDBCardText>
                      You can now register your group easily through Research
                      Management Tool. No need to fill physical papers of forms.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img2_c1v6ul.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Submit Document</MDBCardTitle>
                    <MDBCardText>
                      No need to hand over your documents physically. You can
                      submit your documents online using Research Management
                      Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010221/img3_w41n4j.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Get Evaluated</MDBCardTitle>
                    <MDBCardText>
                      Marking is no longer physical. All the assesments can be
                      done through Research Management Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>

          <MDBFooter className="text-center" color="white" bgColor="dark">
            <MDBContainer className="p-4">
              <section className="">
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>

                    <MDBCol md="5" start="12">
                      <MDBInput
                        contrast
                        type="email"
                        label="Email address"
                        className="mb-4"
                      />
                    </MDBCol>

                    <div className="col-auto">
                      <MDBBtn
                        outline
                        color="light"
                        type="submit"
                        className="mb-4"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </section>

              <section className="mb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </section>
            </MDBContainer>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">
                ResearchManagement.com
              </a>
            </div>
          </MDBFooter>
        </div>
        <div style={{ backgroundColor: "#84809F" }}></div>
      </div>
    );
  } else if (
    JSON.parse(localStorage.getItem("user") || "[]").user_role == "Admin"
  ) {
    return (
      <div className="main-m-container">
        <div className="main-item-con"></div>
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Featured />
          <div className="main-side-container">
            <div className="main-side-sub-container">
              <center>
                <label className="main-t-lbl">
                  {" "}
                  <label style={{ color: "#FF5631" }}>Admin</label> Links
                </label>
              </center>
              <center>
                <a href="/allprof">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    User Management
                  </button>
                </a>{" "}
                <br />
                <a href="/StudentGroup">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Create Groups
                  </button>
                </a>{" "}
                <br />
                <a href="/AllTypes">
                  <button className="btn l-btn-accepted main-side-button">
                    Submission Types
                  </button>
                </a>{" "}
                <br />
                <a href="/AddMarking">
                  <button className="btn l-btn-accepted main-side-button">
                    Create Marking
                  </button>
                </a>{" "}
                <br />
                <a href="/MarkingList">
                  <button className="btn l-btn-accepted main-side-button">
                    Marking List
                  </button>
                </a>
                <a href="/UploadTemplate">
                  <button className="btn l-btn-accepted main-side-button">
                    Templates
                  </button>
                </a>
              </center>
            </div>
          </div>
          <div className="main-cd-container">
            <div className="main-color-cards">
              <MDBCard
                background="primary"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Submission</MDBCardTitle>
                  <MDBCardText>
                    Research Project Topic Submission deadline has extended to
                    27th August 2022.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="main-color-cards2">
              <MDBCard
                background="danger"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Faculty</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>On-Campus Evaluations</MDBCardTitle>
                  <MDBCardText>
                    All the on-campus evaluations has been canceled until
                    further notice. Check notices regulary
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="success"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Update</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                  <MDBCardText>
                    All submitted research topics have been evaluated by the
                    supervisors. Check your topic status.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="warning"
                className="mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Document Templates</MDBCardTitle>
                  <MDBCardText>
                    Latest Document templates are available for download in the
                    Research Management Tool. (2022 Version)
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <MDBAccordion flush initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Manage users in system"
              >
                You are responsible to manage all users in the system. You can
                add, edit, delete users. You can view a complete list of users.
                All users have a name, phone number, email address, and a role
                etc. Roles are different from each users. Be careful with user
                roles.
                <br />
                <br />
                <a href="/allprof">
                  <button className="btn btn-primary">All Profiles</button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Marking Schemes">
                Admins should create marking schemes for evaluations. Marking
                schemes are different from each research topic. You can create
                marking schemes, edit marking schemes, and delete marking
                schemes. You can get a pdf from the edit view of the marking
                scheme.
                <br />
                <br />
                <a href="/AddMarking">
                  <button className="btn btn-primary">
                    Create Marking Scheme
                  </button>
                </a>
                <a href="/MarkingList">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    All Marking Schemes
                  </button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={3}
                headerTitle="Document Submission"
              >
                Admins can upload document templates for the research topics.
                Document templates are different from each research topic. You
                can upload document templates, edit document templates, and
                delete document templates.
                <br />
                <br />
                <a href="/UploadTemplate">
                  <button className="btn btn-primary">New Template</button>
                </a>
                <a href="/SubmitDocs">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    Upload Document
                  </button>
                </a>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img1_irqbi5.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Register Groups</MDBCardTitle>
                    <MDBCardText>
                      You can now register your group easily through Research
                      Management Tool. No need to fill physical papers of forms.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img2_c1v6ul.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Submit Document</MDBCardTitle>
                    <MDBCardText>
                      No need to hand over your documents physically. You can
                      submit your documents online using Research Management
                      Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010221/img3_w41n4j.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Get Evaluated</MDBCardTitle>
                    <MDBCardText>
                      Marking is no longer physical. All the assesments can be
                      done through Research Management Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>

          <MDBFooter className="text-center" color="white" bgColor="dark">
            <MDBContainer className="p-4">
              <section className="">
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>

                    <MDBCol md="5" start="12">
                      <MDBInput
                        contrast
                        type="email"
                        label="Email address"
                        className="mb-4"
                      />
                    </MDBCol>

                    <div className="col-auto">
                      <MDBBtn
                        outline
                        color="light"
                        type="submit"
                        className="mb-4"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </section>

              <section className="mb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </section>
            </MDBContainer>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">
                ResearchManagement.com
              </a>
            </div>
          </MDBFooter>
        </div>
        <div style={{ backgroundColor: "#84809F" }}></div>
      </div>
    );
  } else if (
    JSON.parse(localStorage.getItem("user") || "[]").user_role == "Panel Member"
  ) {
    return (
      <div className="main-m-container">
        <div className="main-item-con"></div>
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Featured />
          <div className="main-side-container">
            <div className="main-side-sub-container">
              <center>
                <label className="main-t-lbl">
                  {" "}
                  <label style={{ color: "#FF5631" }}>Panel</label> Links
                </label>
              </center>
              <center>
                <a href="/allDoc">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Evaluate Topic
                  </button>
                </a>{" "}
                <a href="/EvaluatedTopicList">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Evaluated Topics
                  </button>
                </a>{" "}
                <br />
                <a href="/allDoc">
                  {" "}
                  <button className="btn l-btn-accepted main-side-button">
                    Evaluate Document / presentation
                  </button>
                </a>{" "}
                <br />
                <a href="/profile">
                  <button className="btn l-btn-accepted main-side-button2">
                    My profile
                  </button>
                </a>
              </center>
            </div>
          </div>
          <div className="main-cd-container">
            <div className="main-color-cards">
              <MDBCard
                background="primary"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Submission</MDBCardTitle>
                  <MDBCardText>
                    Research Project Topic Submission deadline has extended to
                    27th August 2022.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="main-color-cards2">
              <MDBCard
                background="danger"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Faculty</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>On-Campus Evaluations</MDBCardTitle>
                  <MDBCardText>
                    All the on-campus evaluations has been canceled until
                    further notice. Check notices regulary
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="success"
                className="text-white mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>Update</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Topic Evaluation</MDBCardTitle>
                  <MDBCardText>
                    All submitted research topics have been evaluated by the
                    supervisors. Check your topic status.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="main-color-cards2">
              <MDBCard
                background="warning"
                className="mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <MDBCardHeader>News Admin</MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle>Document Templates</MDBCardTitle>
                  <MDBCardText>
                    Latest Document templates are available for download in the
                    Research Management Tool. (2022 Version)
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>

            <MDBAccordion flush initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="Manage users in system"
              >
                You are responsible to manage all users in the system. You can
                add, edit, delete users. You can view a complete list of users.
                All users have a name, phone number, email address, and a role
                etc. Roles are different from each users. Be careful with user
                roles.
                <br />
                <br />
                <a href="/allprof">
                  <button className="btn btn-primary">All Profiles</button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Marking Schemes">
                Admins should create marking schemes for evaluations. Marking
                schemes are different from each research topic. You can create
                marking schemes, edit marking schemes, and delete marking
                schemes. You can get a pdf from the edit view of the marking
                scheme.
                <br />
                <br />
                <a href="/AddMarking">
                  <button className="btn btn-primary">
                    Create Marking Scheme
                  </button>
                </a>
                <a href="/MarkingList">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    All Marking Schemes
                  </button>
                </a>
              </MDBAccordionItem>
              <MDBAccordionItem
                collapseId={3}
                headerTitle="Document Submission"
              >
                Admins can upload document templates for the research topics.
                Document templates are different from each research topic. You
                can upload document templates, edit document templates, and
                delete document templates.
                <br />
                <br />
                <a href="/UploadTemplate">
                  <button className="btn btn-primary">New Template</button>
                </a>
                <a href="/SubmitDocs">
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary"
                  >
                    Upload Document
                  </button>
                </a>
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img1_irqbi5.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Register Groups</MDBCardTitle>
                    <MDBCardText>
                      You can now register your group easily through Research
                      Management Tool. No need to fill physical papers of forms.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010222/img2_c1v6ul.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Submit Document</MDBCardTitle>
                    <MDBCardText>
                      No need to hand over your documents physically. You can
                      submit your documents online using Research Management
                      Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBCardImage
                    src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1654010221/img3_w41n4j.png"
                    alt="..."
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>Get Evaluated</MDBCardTitle>
                    <MDBCardText>
                      Marking is no longer physical. All the assesments can be
                      done through Research Management Tool.
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>

          <MDBFooter className="text-center" color="white" bgColor="dark">
            <MDBContainer className="p-4">
              <section className="">
                <form action="">
                  <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                      <p className="pt-2">
                        <strong>Sign up for our newsletter</strong>
                      </p>
                    </div>

                    <MDBCol md="5" start="12">
                      <MDBInput
                        contrast
                        type="email"
                        label="Email address"
                        className="mb-4"
                      />
                    </MDBCol>

                    <div className="col-auto">
                      <MDBBtn
                        outline
                        color="light"
                        type="submit"
                        className="mb-4"
                      >
                        Subscribe
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </section>

              <section className="mb-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </section>
            </MDBContainer>

            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">
                ResearchManagement.com
              </a>
            </div>
          </MDBFooter>
        </div>
        <div style={{ backgroundColor: "#84809F" }}></div>
      </div>
    );
  }
}
