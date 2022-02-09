/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import Carousel from "react-elastic-carousel";
import { Search } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import "./chatlist.css";
import ListFriend from "../listFriend/ListFriend";
import Item from "../Item";
import axios from "axios";
import { fetchAllUser, dispatchGetAllUser } from "../../redux/actions/authAction";
import SearchUser from "../searchUser/SearchUser";

const breakPoints = [
  {
    width: 800,
    itemsToShow: 4,
    itemPadding: [0, 10, 0, 0],
    pagination: false,
    showArrows: false,
  },
];

function chatList({ conversations }) {

  const [querySearch, setQuerySearch] = useState([]);
  const [checkQuery, setCheckQuery] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllUser(token).then((res) => {
        dispatch(dispatchGetAllUser(res));
      });
    }
    fetchData();
  }, [token, dispatch]);

  const clickCurrentSearch = async () => {
    try {
      const res = await axios.get('/api/auth/find_user?name=' + searchRef.current.value);
      if (res.data.length === 0) {
        setQuerySearch([]);
        setCheckQuery(false);
      } else {
        setCheckQuery(true);
        setQuerySearch(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {
  //   clickCurrentSearch();
  // }, [inputSearch]);

  const clickCurrentChat = (conversation) => {
    dispatch({ type: "GET_CURRENT_CHAT", conversation: conversation });
  }

  return (
    <div className="chat-content tap-pane" id="pills-chat">
      <h4>Chats</h4>
      <div className="search-box-chat">
        <div className="input-group-chat">
          <span className="input-text-chat" onClick={clickCurrentSearch} >
            <Search className="search" />
          </span>
          <input type="text"
            name="search"
            placeholder="Search"
            className="form-controll"
            ref={searchRef}
          // onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="slide">
        <Carousel breakPoints={breakPoints}>
          {users.map((user) => (
            <Item key={user._id}>
              <a href="/chat_home" className="item">
                <div className="item-imgage">
                  <img src={user.avatar} alt="" />
                  <span className="user-status"></span>
                </div>
                <div className="item-text">
                  <h5>{user.name}</h5>
                </div>
              </a>
            </Item>
          ))}
        </Carousel>
      </div>
      <div className="user-online">
        <h5 >Recent</h5>
        <div className="chat-message-list">
          <div className="simplebar-wrapper">
            <div className="simplebar-offset">
              {!checkQuery ?
                conversations.map(c => (
                  <div key={c._id} onClick={() => clickCurrentChat(c)} >
                    <ListFriend conversation={c} />
                  </div>
                )) :
                querySearch.map((q, i) => (
                  <div key={i}>
                    <SearchUser q={q} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chatList;
