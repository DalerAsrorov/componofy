import { ADD_ERROR_TO_APP, REMOVE_ERROR_FROM_APP } from '../actions';
import * as R from 'ramda';

export const errors = (state = {}, action) => {
    let errors;

    switch (action.type) {
        case ADD_ERROR_TO_APP:
            errors = R.clone(state);

            errors[action.errorId] = action.error;

            return errors;

        case REMOVE_ERROR_FROM_APP:
            errors = R.clone(state);

            delete errors[action.errorId];

            return errors;
        default:
            return state;
    }
};
