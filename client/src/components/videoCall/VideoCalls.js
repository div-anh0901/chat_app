import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Phone } from '@material-ui/icons';
import Peer from 'simple-peer';
import './videoCall.css';
function VideoCalls() {
    const dispatch = useDispatch();

    const handerBtnVideo = () => {
        dispatch({ type: "VIDEO_CALL_BTN_NONE" });
    }

    return (
        <div className='video_call' >
            <div className='video_content'>
                <div className='video_sender'>
                    <video
                        autoPlay
                        muted={true}
                        playsInline
                    // ref={myVideo}
                    ></video>
                </div>
                <div className='video_receiver' >
                    <div className='btn_video'>
                        <button className='btn_phone' onClick={handerBtnVideo} >
                            <Phone />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCalls
