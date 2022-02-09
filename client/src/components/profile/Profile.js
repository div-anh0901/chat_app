import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./profile.css";
import { MoreVert, Album, Person, ChevronRight } from "@material-ui/icons";
export default function Profile() {
  const [about, setAbout] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const clickHandler = () => {
    setAbout(!about);
  };

  return (
    <div id="pills-user" className="tap-pane">
      <div className="px-4 pt-4">
        <div className="user-chat-bar">
          <div className="dropdown">
            <MoreVert />
          </div>
        </div>
        <h4>My Profile</h4>
      </div>
      <div className="text-center p-4 border-bottom">
        <div className="mb-4">
          <img src={user.avatar} className="avartar-lg" alt="" />
        </div>
        <h5 className="text-truncate">Patricia Smith</h5>
        <p className="text-muted text-truncate">
          <Album className="font-size-10 text-success" />
          Acticve
        </p>
      </div>
      <div className="p-4 user-profile-desc">
        <div className="text-muted">
          <p className="mb-4">
            If several languages coalesce, the grammar of the resulting language
            is more simple and regular than that of the individual.
          </p>
        </div>
        <div className="profile-user-custom">
          <div className="about-user">
            <span className="text-dark">
              <div className="profile-user-handing" onClick={clickHandler}>
                <h5 className="text-about">
                  <Person className="person" />
                  About
                  <ChevronRight className="chevron" />
                </h5>
              </div>
              <div className={about ? "info" : "info d-none"}>
                <div className="fild">
                  <p>Name</p>
                  <span>{user.name}</span>
                </div>
                <div className="fild">
                  <p>Email</p>
                  <span>{user.email}</span>
                </div>
                <div className="fild">
                  <p>Time</p>
                  <span>40 AM</span>
                </div>
                <div className="fild">
                  <p>Location</p>
                  <span>Califormia, USA</span>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
