import {
    getHistoryAction,
    getHistoryByUserIdAction,
    postHistoryAction,
    pending,
    rejected,
    fulfilled,
} from '../actions/actionTypes';

const initialValue = {
    response: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMessage: '',
};

const historys = (prevState = initialValue, action) => {
    switch (action.type) {
        case getHistoryAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case getHistoryAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case getHistoryAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data,
            };
        case getHistoryByUserIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case getHistoryByUserIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case getHistoryByUserIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data,
            };
        case postHistoryAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case postHistoryAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case postHistoryAction + fulfilled:
            prevState.response.push(action.payload.data.data);
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: prevState.response,
            };
        default:
            return {
                ...prevState,
            };
    };
};

export default historys;
