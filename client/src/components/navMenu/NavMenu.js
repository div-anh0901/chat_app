import React from "react";
import { useSelector } from 'react-redux';
import "./navmenu.css";

import {
  Person,
  SmsSharp,
  Group,
  Settings,
  Public,
  Search,
  Cloud,
} from "@material-ui/icons";
export default function NavMenu({ clickChatList, clickProfile, clickGourps }) {
  const navbar = "navbar-brand-box";
  const user = useSelector((state) => state.auth.user);

  const handlerLogout = async () => {
    try {
      await localStorage.removeItem('firstLogin');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={navbar}>
        <a className="logo logo-dark" href="/chat_home">
          <span className="logo-sm">
            <img src="/images/logo.e41f6087.svg" alt="" />
          </span>
        </a>
      </div>
      <div className="flex-lg-column my-auto">
        <ul className="side-menu-nav">
          <li id="profile" className="nav-item" onClick={clickProfile}>
            <span id="pills-user-tab" className="nav-link">
              <Person />
            </span>
          </li>
          <li id="Chats" className="nav-item" onClick={clickChatList}>
            <span id="pills-user-tab" className="nav-link">
              <SmsSharp />
            </span>
          </li>
          <li id="Group" className="nav-item" onClick={clickGourps}>
            <span id="pills-user-tab" className="nav-link">
              <Group />
            </span>
          </li>
          <li id="Contact" className="nav-item">
            <span id="pills-user-tab" className="nav-link">
              <Search />
            </span>
          </li>
          <li id="Setting" className="nav-item">
            <span id="pills-user-tab" className="nav-link">
              <Settings />
            </span>
          </li>
        </ul>
      </div>
      <div className="flex-lg-column my-auto">
        <ul className="side-menu-nav">
          <li id="Public" className="nav-item">
            <span id="pills-user-tab" className="nav-link">
              <Public />
            </span>
          </li>
          <li id="Public" className="nav-item">
            <span id="pills-user-tab" className="nav-link">
              <Cloud />
            </span>
          </li>
          <li id="Public" className="nav-item" onClick={handlerLogout} >
            <span id="pills-user-tab" className="nav-link">
              <img src={user.avatar} alt="" />
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
