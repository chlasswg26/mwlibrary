import {
    putUserAction,
    pending,
    rejected,
    fulfilled,
} from '../actions/actionTypes';

const initialValue = {
    response: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMessage: '',
};

const user = (prevState = initialValue, action) => {
    switch (action.type) {
        case putUserAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case putUserAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            }
        case putUserAction + fulfilled:
            const edited = prevState.response.map(user => {
                if (user.id === action.payload.data.data.id) {
                    return action.payload.data.data;
                }
                return user;
            });
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: edited,
            };
        default:
            return {
                ...prevState,
            };
    };
};

export default user;
