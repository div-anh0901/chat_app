import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Chat from "./chat/Chat";


export default function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <div>
      <Routes>
        <Route path="/signin" element={isLogged ? <Navigate to="/chat_home" /> : <Login />} />
        <Route path="/" element={<Navigate to="/chat_home" />} />
        <Route path="/signup" element={isLogged ? <Navigate to="/chat_home" /> : <Register />} />
        <Route
          path="/api/auth/activate/:activation_token"
          element={<ActivationEmail />}
        />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/api/auth/reset/:token" element={<ResetPassword />} />
        <Route path="/chat_home" element={isLogged ? <Chat /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}
