import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};


export const fetchUser = async (token) => {
  const res = await axios.get("/api/auth/info", {
    headers: { Authorization: token }
  });
  return res
}

export const dispatchGetUser = (res) => {
  return {
    type: ACTIONS.GET_USER,
    payload: { user: res.data }
  }
}


export const fetchAllUser = async (token) => {
  const res = await axios.get('/api/auth/all_info', {
    headers: { Authorization: token }
  });
  return res;
}

export const dispatchGetAllUser = (res) => {
  return {
    type: ACTIONS.GET_ALL_USER,
    payload: res.data
  }
}
