import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './searchUser.css';

function SearchUser({ q }) {
    const dispatch = useDispatch();
    const [conversations, setConversations] = useState("");
    const user_v1 = useSelector(state => state.auth.user);
    const user_v2 = useSelector(state => state.chat.user);
    const getConventions = async (user) => {
        try {
            const res = await axios.get('api/chat/get-conversation-one-user/' + user?._id);
            setConversations(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handlerCurrent = (user) => { //user  = q
        getConventions(user);
        dispatch({ type: 'MESSAGEUSER', user });//type : 'MESSAGEUSER' lấy thông tin của user lưa vào redux
    }


    useEffect(() => {
        if (conversations.length === 0) {
            dispatch({ type: "CHECK_CVS_CHAT_FALSE" });
        } else if (conversations.length === 1) {
            if (conversations[0].members.find(m => m === user_v1._id)) {
                dispatch({ type: "CHECK_CVS_CHAT_SUCCESS", conversations });
            } else {
                dispatch({ type: "CHECK_CVS_CHAT_FALSE" });
            }
        } else {
            const setCurrentCvs = async () => {
                const res = await axios.get(`api/chat/get-conversation-all-user/${user_v1._id}/${user_v2._id}`);
                console.log(res.data);
                if (res.data === null) {
                    dispatch({ type: "CHECK_CVS_CHAT_FALSE" });
                } else {
                    dispatch({ type: "CHECK_CVS_CHAT_SUCCESS", conversation: res.data });
                }

            }
            setCurrentCvs()
        }
    }, [conversations, user_v1, dispatch, user_v2]);

    return (
        <>
            <ul className="chat-list">
                <li onClick={() => handlerCurrent(q)} >
                    <a href="/chat_home">
                        <div className="chat-user">
                            <div className="chat-user-img">
                                <img alt="" src={q.avatar} />
                                <span className="user-status"></span>
                            </div>
                            <div className="chat-user-text">
                                <h5>{q.name}</h5>
                            </div>
                            <div className="chat-user-time">7:30</div>
                        </div>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default SearchUser
