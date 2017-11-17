import { RECEIVED_AUTH_STATE } from '../actions';

export const user = (state = {}, action) => {
    switch (action.type) {
        case RECEIVED_AUTH_STATE:
            return Object.assign({}, state, action.userInfo);
        default:
            return state;
    }
};
