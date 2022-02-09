import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../../components/utils/notification/Notification";

import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const initalState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initalState);
  const { email, password, err, success } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log(res);
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      navigate("/chat_home");
    } catch (err) {
      setUser({
        ...user,
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  return (
    <div className="form-page">
      <div className="f-center">
        <h2>Sign in</h2>
        <p>Sign in to continue Chat app</p>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className="form-groups">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
            <button type="submit"> Sign in</button>
          </form>
        </div>
        <p>
          <Link to="/forgot">forgot password</Link>
        </p>
        <p>
          Don't have account ? <Link to="/signup">Signup now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
