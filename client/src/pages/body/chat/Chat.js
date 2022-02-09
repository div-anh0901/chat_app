import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { useSelector } from 'react-redux';
import axios from 'axios';

import { FileCopyOutlined, Image, Send } from '@material-ui/icons';
import NavMenu from "../../../components/navMenu/NavMenu";
import Profile from "../../../components/profile/Profile";
import ChatList from "../../../components/chatList/ChatList";
import Groups from "../../../components/groups/Groups";
import NavMessage from "../../../components/navMessage/NavMessage";
import AddFriend from "../../../components/addFriend/AddFriend";
import Message from "../../../components/message/Message";
import { io } from "socket.io-client";
import VideoCalls from "../../../components/videoCall/VideoCalls";

function Chat() {
  const [chatList, setChatList] = useState(true);
  const [profile, setProfile] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const user = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.current.conversation);
  const btnVideo = useSelector(state => state.video.btnVideo);
  const currentExits = useSelector((state) => state.current.exits);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    })
  }, [socket]);

  useEffect(() => {
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUser", users => {
      // console.log(users);
    });
  }, [user, socket]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get('api/chat/get-conversation-one-user/' + user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/api/chat/get-conversation-id/' + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat, messages]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }
    const recriverId = currentChat.members.find(member => member !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: recriverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/api/chat/new-message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  const clickChatList = () => {
    setChatList(true);
    setProfile(false);
    setGroups(false);
  };

  const clickProfile = () => {
    setChatList(false);
    setProfile(true);
    setGroups(false);
  };

  const clickGourps = () => {
    setChatList(false);
    setProfile(false);
    setGroups(true);
  };


  return (
    <div className="root">
      <div className="layout-wrapper d-flex">
        <div className="side-menu flex-lg-column">
          <NavMenu
            clickChatList={clickChatList}
            clickProfile={clickProfile}
            clickGourps={clickGourps}
          />
        </div>
        <div className="chat-leftsidebar">
          <div className="tap-content">
            <div className={chatList ? "" : "d-none"}>
              <ChatList conversations={conversations} currentUser={user} />
            </div>
            <div className={profile ? "" : "d-none"}>
              <Profile />
            </div>
            <div className={groups ? "" : "d-none"}>
              <Groups />
            </div>
          </div>
        </div>
        <div className="chatMessage">
          <div className="navMessage">
            <NavMessage />
          </div>
          {
            currentExits ?
              <div className="mesageContainer" >
                {
                  messages.map((message) => (
                    <div ref={scrollRef} key={message._id} >
                      <Message own={message.sender === user._id} message={message} />
                    </div>
                  ))
                }
              </div> :
              <div className="add_friend" >
                <AddFriend />
              </div>
          }
          <div className="message-input" >
            <div className="messagepadding" >
              <input
                type="text"
                placeholder="Enter Message"
                onChange={e => setNewMessage(e.target.value)}
                name="text"
                value={newMessage}
              />
              <FileCopyOutlined className="icon" />
              <Image className="icon" />
              <Send className="icon" onClick={handlerSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className={btnVideo ? "videoContainer" : "videoContainer active"}>
        <VideoCalls />
      </div>
    </div>
  );
}

export default Chat;
