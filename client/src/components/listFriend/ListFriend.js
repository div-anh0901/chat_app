import React, { useEffect, useState } from 'react'
import './listFriend.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


function ListFriend({ conversation }) {
    const cuurentUser = useSelector((state) => state.auth.user);
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const friendId = conversation?.members.find(m => m !== cuurentUser._id);
        const getUser = async () => {
            try {
                const res = await axios.get("/api/auth/friend?userId=" + friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [conversation, cuurentUser]);

    const clickMesage = (user) => {
        dispatch({ type: 'MESSAGEUSER', user });//type : 'MESSAGEUSER' lấy thông tin của user lưa vào redux
    };

    return (
        <>
            <ul className="chat-list">
                <li key={user._id} onClick={() => clickMesage(user)} >
                    <a href="/chat_home">
                        <div className="chat-user">
                            <div className="chat-user-img">
                                <img src={user.avatar} alt="" />
                                <span className="user-status"></span>
                            </div>
                            <div className="chat-user-text">
                                <h5>{user.name}</h5>
                                <p>{user.message}</p>
                            </div>
                            <div className="chat-user-time">7:30</div>
                        </div>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default ListFriend
