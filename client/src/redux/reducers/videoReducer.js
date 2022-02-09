import ACTIONS from "../actions";

const videoRequest = {
    myVideo: null,
    btnVideo: false
}


function videoReducer(state = videoRequest, action) {
    switch (action.type) {
        case ACTIONS.VIDEO_CALL_BTN_BLOCK:
            return {
                ...state,
                myVideo: action.myVideo,
                btnVideo: true
            }
        case ACTIONS.VIDEO_CALL_BTN_NONE:
            return {
                ...state,
                btnVideo: false
            }
        default:
            return state;
    }
}

export default videoReducer
