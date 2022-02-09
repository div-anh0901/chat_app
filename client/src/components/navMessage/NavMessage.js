import React, { useEffect, useRef, useState } from "react";
import './navMessage.css';
import { Search, Phone, VideoCall, MoreHoriz, Person } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

function NavMessage() {
    const messageUser = useSelector((state) => state.chat.user);
    // const dispatch = useDispatch();
    // const [stream, setStream] = useState("");

    const handlerVideoCall = async () => {
        // await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        //     .then(mediaStream => {
        //         setStream(mediaStream)
        //         dispatch({ type: "VIDEO_CALL_BTN_BLOCK", myVideo: stream });
        // mediaStream.getTracks()[0].stop();
        //     })
    }

    return (
        <div className="navMessage" >
            <div className="navContainer" >
                <div className="nav" >
                    <div className="navInfo" >
                        <img src={messageUser.avatar} alt="" />
                        <p>{messageUser.name}</p>
                        <span></span>
                    </div>
                    <div className="navIcon">
                        <Search className="icon" />
                        <Phone className="icon" />
                        <VideoCall onClick={handlerVideoCall} className="icon" />
                        <Person className="icon" />
                        <MoreHoriz className="icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavMessage
