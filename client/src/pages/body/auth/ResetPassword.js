import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../../components/utils/notification/Notification";
import {
  isLength,
  isMatch,
} from "../../../components/utils/validation/Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async (e) => {
    e.preventDefault();
    if (isLength(password)) {
      setData({
        ...data,
        err: "Password must be at least 6 charater.",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      setData({
        ...data,
        err: "Password did not match",
        success: "",
      });
    }

    try {
      const res = await axios.post(
        "/api/auth/reset",
        { password },
        { headers: { Authorization: token } }
      );
      setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="form-page">
      <div className="f-center">
        <h2>Forgot Your Password?</h2>
        <div className="form-groups">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <form onSubmit={handleResetPass}>
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
              <label htmlFor="cf_password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
              />
            </div>

            <button type="submit"> Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
