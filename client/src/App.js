import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./pages/body/Body.js";
import axios from "axios";
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction';
import { useDispatch, useSelector } from "react-redux";
// import Header from "./components/header/Header";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      }
      getUser();
    }
  }, [token, dispatch]);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token })
      }
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Body />
      </div>
    </Router>
  );
}

export default App;
