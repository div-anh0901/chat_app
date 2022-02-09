import React, { useState, useEffect } from 'react';
import './message.css';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
function Message({ own, message }) {
    const [user, setUser] = useState({});
    const user_v1 = useSelector((state) => state.auth.user);
    const user_v2 = useSelector((state) => state.chat.user);

    useEffect(() => {
        if (user_v1._id === message.sender) {
            setUser(user_v1);
        } else {
            setUser(user_v2);
        }
    }, [user, user_v1, user_v2, message.sender]);

    return (
        <div className={own ? "message" : "message  own"}>
            <div className="messageTop">
                <img src={user.avatar} className='messageImg' alt="" />
                <p className="messageText" >{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
