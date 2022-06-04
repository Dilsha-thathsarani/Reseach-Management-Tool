import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { isLength, isMatch } from "./utils/validation/Validation";
import { showSuccessMsg, showErrMsg } from "./utils/notification/Notification";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  mobile: "",
  user_role: "",
  reg_number: "",
  err: "",
  success: "",
};

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [data, setData] = useState(initialState);
  const {
    name,
    email,
    mobile,
    user_role,
    reg_number,
    password,
    cf_password,
    err,
    success,
  } = data;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getUser() {
      await axios
        .get(`https://research-management-tool-ym.herokuapp.com/user/infor/${user._id}`)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(JSON.parse(localStorage.getItem("user")));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUser();
  }, [user._id, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(
        "http//:localhost:8070/api/upload_avatar",
        formData
      );

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  async function updateInfor() {
    try {
      axios.patch(`https://research-management-tool-ym.herokuapp.com/user/update/${user._id}`, {
        name: name ? name : user.name,
        email: email ? email : user.email,
        avatar: avatar ? avatar : user.avatar,
        mobile: mobile ? mobile : user.mobile,
      });

      setData({ ...data, err: "", success: "Updated Success!" });
      window.location.reload(false);
      window.location.reload(false);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  }

  async function updatePassword() {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 8 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      await axios.post(`http//:localhost:8070/user/reset/${user._id}`, {
        password,
      });

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  }

  const handleUpdate = () => {
    updateInfor();
  };

  return (
    <div className="topic-container">
      <div style={{ backgroundColor: "#0F0934" }}>
        <div>
          <img
            className="img-side"
            src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"
          ></img>
        </div>

        <div className="t-title-container">
          <label className="sideLable" style={{ color: "#FF5631" }}>
            SLIIT{" "}
          </label>{" "}
          <br className="br1" />
          <label className="sideLable">Research</label>
          <br className="br1" />
          <label className="sideLable">Management </label>{" "}
          <br className="br1" />
          <label className="sideLable">Tool. </label> <br className="br1" />
        </div>

        <div className="sublable-container">
          <label className="subLable">WELCOME TO THE PROFILE</label>
        </div>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <div className="profile_page">
          <center>
            <h1
              className="profilefont"
              style={{ color: "#322B5F", fontWeight: "bold" }}
            >
              User Profile
            </h1>{" "}
          </center>
          <div className="reg-from-container">
            <div>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
            </div>

            <div className="avatar">
              <center>
                <img
                  src="https://196034-584727-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/05/Office-Assistant-Profile-Photo.jpg"
                  alt=""
                />
              </center>
            </div>

            <div className="mb-3">
              <label
                htmlFor="name"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                Name
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="t-form-control"
                name="name"
                id="name"
                defaultValue={user.name}
                placeholder="Your name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                Email
              </label>
              <input
                type="email"
                style={{ width: "450px" }}
                className="t-form-control"
                name="email"
                id="email"
                defaultValue={user.email}
                disabled
                placeholder="Your email address"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="mobile"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                Mobile
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="t-form-control"
                name="mobile"
                id="mobile"
                defaultValue={user.mobile}
                placeholder="Mobile"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="user_role"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                User Role
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="t-form-control"
                name="user_role"
                id="user_role"
                defaultValue={user.user_role}
                placeholder="Your user_role "
                disabled
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="reg_number"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                Register Number
              </label>
              <input
                type="text"
                style={{ width: "450px" }}
                className="t-form-control"
                name="reg_number"
                id="reg_number"
                defaultValue={user.reg_number}
                placeholder="Your reg_number "
                disabled
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                New Password
              </label>
              <input
                type="password"
                style={{ width: "450px" }}
                className="t-form-control"
                name="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="cf_password"
                className="t-form-label"
                style={{ color: "#322B5F" }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                style={{ width: "450px" }}
                className="t-form-control"
                name="cf_password"
                id="cf_password"
                placeholder="Confirm password"
                value={cf_password}
                onChange={handleChange}
              />
            </div>

            <br />
            <div>
              <em style={{ color: "crimson" }}></em>
            </div>
            <br />
            <center>
              {" "}
              <button
                className="l-btn-accept"
                style={{ width: "200px", fontWeight: "bold" }}
                onClick={updateInfor}
              >
                Update
              </button>{" "}
            </center>
          </div>
          <div className="bottom-profile">
            <label className="bottom-t" style={{ color: "#FF5631" }}>
              {" "}
              SLIIT
            </label>{" "}
            <label className="bottom-t"> Research</label> <br />
            <label className="bottom-t"> Management Tool</label>
          </div>
        </div>
      </div>
    </div>
  );
}
