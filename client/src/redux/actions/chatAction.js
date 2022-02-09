import ACTIONS from "./index";

export const messageUser = (user) => {
    return {
        type: ACTIONS.MESSAGEUSER,
        user
    }
}

export const currentChat = (conversation) => {
    return {
        type: ACTIONS.GET_CURRENT_CHAT,
        conversation
    }
}

export const myVideo = (myVideo) => {
    return {
        type: ACTIONS.VIDEO_CALL_BTN_BLOCK,
        myVideo
    }
}

// export const checkCurrentChat = (exist) => {
//     return {
//         type: ACTIONS.CHECK_CURRENT_CHAT,
//         payload: {exist}
//     }
// }
