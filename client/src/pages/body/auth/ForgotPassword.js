import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../../components/utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../../components/utils/notification/Notification";

const initalState = {
  email: "",
  err: "",
  success: "",
};

function FotgotPassword() {
  const [data, setData] = useState(initalState);
  const { email, err, success } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      return setData({ ...data, err: "Invalid emails", success: "" });
    }

    try {
      const res = await axios.post("/api/auth/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (e) {
      e.response.data.msg &&
        setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };
  return (
    <div className="form-page">
      <div className="f-center">
        <h2>Forgot Your Password?</h2>
        <div className="form-groups">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
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

            <button type="submit"> Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FotgotPassword;
