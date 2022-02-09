import React from "react";
import "./group.css";
import { Group, Search } from "@material-ui/icons";
export default function Groups() {
  return (
    <div className="chat-groups tap-pane" id="pills-user">
      <div className="p-4">
        <div className="create-group">
          <Group />
        </div>
        <h4 className="mb-4">Groups</h4>
        <div className="search-box-group">
          <span className="btn-search">
            <Search className="search-group" />
          </span>
          <input
            type="text"
            placeholder="Search groups..."
            className="input-group"
          />
        </div>
        <div className="groups">
          <ul>
            <li className="group">
              <a href="/">
                <div className="group-p">
                  <div className="img-group">
                    <span>G</span>
                  </div>
                  <div className="title-group">#Genarel</div>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="/">
                <div className="group-p">
                  <div className="img-group">
                    <span>G</span>
                  </div>
                  <div className="title-group">#Genarel</div>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="/">
                <div className="group-p">
                  <div className="img-group">
                    <span>G</span>
                  </div>
                  <div className="title-group">#Genarel</div>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="/">
                <div className="group-p">
                  <div className="img-group">
                    <span>G</span>
                  </div>
                  <div className="title-group">#Genarel</div>
                </div>
              </a>
            </li>
            <li className="group">
              <a href="/">
                <div className="group-p">
                  <div className="img-group">
                    <span>G</span>
                  </div>
                  <div className="title-group">#Genarel</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
