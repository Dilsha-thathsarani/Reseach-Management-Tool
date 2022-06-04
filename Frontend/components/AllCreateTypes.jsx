import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/st.css";
import "./CSS/stgrup.css";
import { Button } from "react-bootstrap";
import { Store } from "react-notifications-component";
import { useHistory } from "react-router-dom";

export default function AllCreateTypes() {
  const [type, setTypes] = useState([]);
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

  setTimeout(() => {
    authenticate();
  }, 0);

  useEffect(() => {
    console.log(
      JSON.parse(localStorage.getItem("user") || "[]").user_role != "Admin"
    );
    axios
      .get("https://research-management-tool-ym.herokuapp.com/template")
      .then((res) => {
        setTypes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setData = (data) => {
    let { _id, AdminName, SchemaType, Title, Template, Description } = data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("AdminName", AdminName);
    localStorage.setItem("SchemaType", SchemaType);
    localStorage.setItem("Title", Title);
    localStorage.setItem("Template", Template);
    localStorage.setItem("Description", Description);

    console.log(data);
  };

  const onDelete = (_id) => {
    let ans = window.confirm("Do you want to delete this type ?");

    if (ans) {
      axios
        .delete(`https://research-management-tool-ym.herokuapp.com/template/${_id}`)
        .then((res) => {
          Store.addNotification({
            title: "Delete Succesfully.",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            type: "success",
            insert: "top",
            container: "top-right",

            dismiss: {
              duration: 2500,
              onScreen: true,
              showIcon: true,
            },

            width: 400,
          });
          console.log(res);
          window.location.reload(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  //SEARCH BAR FUNCTION
  // const filterData = (stype, searchkey) => {
  //   const result = stype.filter(
  //     (UploadTemplate) =>
  //       UploadTemplate.SchemaType.toLowerCase().includes(searchkey) ||
  //       UploadTemplate.SchemaType.toUpperCase().includes(searchkey) ||
  //       UploadTemplate.SchemaType.includes(searchkey)
  //   );

  //   setTypes(result);
  // };

  // function handleSearch(e) {
  //   const searchkey = e.currentTarget.value;

  //   axios.get("http://localhost:8070/template").then((res) => {
  //     if (res.data.success) {
  //       filterData(res.data.schema, searchkey);
  //     }
  //   });
  // }

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

          <section className="py-4 container mt-2">
            {/* search bar */}
            {/* <div className="row" style={{ marginLeft: "10px" }}>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search Schema Type "
                  name="searchQuery"
                  onChange={handleSearch}
                ></input>
              </div>
            </div> */}
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
                        &nbsp; &nbsp;
                        <a
                          className="btn btn-danger"
                          //href="/delete"
                          onClick={() => onDelete(data._id)}
                        >
                          <i className="far fa-trash-alt"></i>&nbsp;Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <div className="bottom-t-container">
                <label className="bottom-t" style={{ color: "#FF5631" }}>
                  {" "}
                  SLIIT
                </label>{" "}
                <label className="bottom-t"> Research</label> <br />
                <label className="bottom-t"> Management Tool</label>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
