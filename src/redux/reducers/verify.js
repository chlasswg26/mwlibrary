import {
    verifyAction,
    pending,
    rejected,
    fulfilled,
} from '../actions/actionTypes';

const initialValue = {
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMessage: '',
};

const verify = (prevState = initialValue, action) => {
    switch (action.type) {
        case verifyAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case verifyAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case verifyAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
            };
        default:
            return {
                ...prevState,
            };
    };
};

export default verify;
