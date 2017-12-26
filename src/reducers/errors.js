import { ADD_ERROR_TO_APP, REMOVE_ERROR_FROM_APP } from '../actions';
import * as R from 'ramda';

export const errors = (state = {}, action) => {
    let errors, errorId;

    switch (action.type) {
        case ADD_ERROR_TO_APP:
            errors = R.clone(state);
            errorId = R.toString(action.errorId);

            errors[errorId] = {
                message: action.message,
                timeout: action.timeout,
                errorId
            };

            return errors;

        case REMOVE_ERROR_FROM_APP:
            errors = R.clone(state);

            delete errors[action.errorId];

            return errors;
        default:
            return state;
    }
};
