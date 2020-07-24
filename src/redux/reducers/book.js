import {
    getBookAction,
    getBookByIdAction,
    getBookByUserIdAction,
    getBookByFilterAction,
    postBookAction,
    putBookAction,
    deleteBookAction,
    pending,
    rejected,
    fulfilled,
} from '../actions/actionTypes';

const initialValue = {
    response: [],
    responseBook: [],
    responseBookById: {},
    responseBookByUserId: [],
    responseBookByFilter: [],
    pagination: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMessage: '',
};

const book = (prevState = initialValue, action) => {
    switch (action.type) {
        case getBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case getBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case getBookAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                responseBook: action.payload.data.data,
            };
        case getBookByIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case getBookByIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case getBookByIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                responseBookById: action.payload.data.data,
            };
        case getBookByUserIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case getBookByUserIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case getBookByUserIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                responseBookByUserId: action.payload.data.data,
            };
        case getBookByFilterAction + pending:
            return {
                ...prevState,
            };
        case getBookByFilterAction + rejected:
            return {
                ...prevState,
                errorMessage: action.payload.response.data.data.message,
            };
        case getBookByFilterAction + fulfilled:
            return {
                ...prevState,
                responseBookByFilter: action.payload.data.data,
                pagination: action.payload.data.pagination,
            };
        case postBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case postBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case postBookAction + fulfilled:
            prevState.response.push(action.payload.data.data);
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: prevState.response,
            };
        case putBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case putBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            }
        case putBookAction + fulfilled:
            const edited = prevState.response.map(book => {
                if (book.id === action.payload.data.data.id) {
                    return action.payload.data.data;
                }
                return book;
            });
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: edited,
            };
        case deleteBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case deleteBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMessage: action.payload.response.data.data.message,
            };
        case deleteBookAction + fulfilled:
            const deleted = prevState.response.filter(book => book.id !== action.payload.data.data.id);
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: deleted,
            };
        default:
            return {
                ...prevState,
            };
    };
};

export default book;
