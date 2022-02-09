import ACTIONS from "../actions";
const current = {
    conversation: null,
    exits: true
};


function currentReducer(state = current, action) {
    switch (action.type) {
        case ACTIONS.GET_CURRENT_CHAT:
            return {
                ...state,
                conversation: action.conversation,
                exits: true
            }
        case ACTIONS.CHECK_CVS_CHAT_SUCCESS:
            return {
                ...state,
                conversation: action.conversation,
                exits: true
            }
        case ACTIONS.CHECK_CVS_CHAT_FALSE:
            return {
                ...state,
                exits: false
            }
        default:
            return state;
    }
}

export default currentReducer
