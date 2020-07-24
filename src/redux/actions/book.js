import {
    getBookAction,
    getBookByIdAction,
    getBookByUserIdAction,
    getBookByFilterAction,
    postBookAction,
    putBookAction,
    deleteBookAction,
} from './actionTypes';
import {
    getBook,
    getBookById,
    getBookByUserId,
    getBookByFilter,
    postBook,
    putBook,
    deleteBook,
} from '../../utils/Http';

export const getBookActionCreator = () => {
    return {
        type: getBookAction,
        payload: getBook(),
    };
};

export const getBookByIdActionCreator = (id, token) => {
    return {
        type: getBookByIdAction,
        payload: getBookById(id, token),
    };
};

export const getBookByUserIdActionCreator = (id, token) => {
    return {
        type: getBookByUserIdAction,
        payload: getBookByUserId(id, token),
    };
};

export const getBookByFilterActionCreator = (token, params) => {
    return {
        type: getBookByFilterAction,
        payload: getBookByFilter(token, params),
    };
};

export const postBookActionCreator = (body, token) => {
    return {
        type: postBookAction,
        payload: postBook(body, token),
    };
};

export const putBookActionCreator = (id, body, token) => {
    return {
        type: putBookAction,
        payload: putBook(id, body, token),
    };
};

export const deleteBookActionCreator = (id, token) => {
    return {
        type: deleteBookAction,
        payload: deleteBook(id, token),
    };
};
