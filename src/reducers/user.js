import { RECEIVED_AUTH_STATE, RECEIVE_NEW_API_ACCESS_TOKEN } from '../actions';

export const user = (
    state = {
        id: '',
        accessToken: '',
        refreshToken: '',
        sessionID: '',
        isAuthenticated: false,
        expiresIn: 0,
        lastVisit: 0
    },
    action
) => {
    switch (action.type) {
        case RECEIVED_AUTH_STATE:
            return Object.assign({}, state, action.userInfo);
        case RECEIVE_NEW_API_ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.accessToken
            });
        default:
            return state;
    }
};
