import { combineReducers } from "redux";

import auth from "./authReducer";
import chat from './chatReducer';
import token from './tokenReducer';
import users from './usersReducer';
import current from './currentReducer';
import video from './videoReducer';
export default combineReducers({
  auth,
  chat,
  token,
  users,
  current,
  video
});
