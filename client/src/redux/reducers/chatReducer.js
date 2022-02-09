import ACTIONS from "../actions";

const chatMessage = {
    user: {
        id: 1,
        avatar: '/images/avatar.jpg',
        name: 'Join',
        message: 'hello'
    },
};
const chatReducer = (state = chatMessage, action) => {
    switch (action.type) {
        case ACTIONS.MESSAGEUSER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}


export default chatReducer;