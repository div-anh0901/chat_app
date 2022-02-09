import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../../components/utils/notification/Notification";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/api/auth/activation", {
            activation_token,
          });
          navigate("/signin");
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate]);

  return (
    <div className="active_page">
      validate
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}

export default ActivationEmail;
