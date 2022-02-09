import React from 'react'
import './addFriend.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddFriend() {
    const user_v1 = useSelector((state) => state.auth.user);
    const user_v2 = useSelector((state) => state.chat.user);
    const handerAddFriend = async () => {
        try {
            await axios.post('api/chat/new-conversation', {
                senderId: user_v1._id,
                receiverId: user_v2._id
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="friend">
            <h1>
                Users must be friends to text
            </h1>
            <div className="btn" onClick={handerAddFriend} >
                <button>
                    Add Friend
                </button>
            </div>
        </div>
    )
}

export default AddFriend
