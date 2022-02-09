import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../../components/utils/notification/Notification";

// import { dispatchLogin } from "../../../redux/actions/authAction";
// import { useDispatch } from "react-redux";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../../components/utils/validation/Validation";

const initalState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
function Register() {
  const [user, setUser] = useState(initalState);
  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Please fill in asll fields.",
        success: "",
      });
    }

    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Invalid email.",
        success: "",
      });
    }
    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be at least 6 charater.",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: "Password did not match",
        success: "",
      });
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      setUser({
        ...user,
        err: e.response.data.msg,
        success: "",
      });
    }
  };

  return (
    <div className="form-page">
      <div className="f-center">
        <h2>Register</h2>
        <p>Sign in to continue Chat app</p>

        <div className="form-groups">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"> Confirm Password</label>

              <input
                type="password"
                className="form-control"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>
        <p>
          Don't have account ? <Link to="/signin">Sign in </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
