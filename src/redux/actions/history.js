import {
    getHistoryAction,
    getHistoryByUserIdAction,
    postHistoryAction,
} from './actionTypes';
import {
    getHistory,
    getHistoryByUserId,
    postHistory,
} from '../../utils/Http';

export const getHistoryActionCreator = (token) => {
    return {
        type: getHistoryAction,
        payload: getHistory(token),
    };
};

export const getHistoryByUserIdActionCreator = (id, token) => {
    return {
        type: getHistoryByUserIdAction,
        payload: getHistoryByUserId(id, token),
    };
};

export const postHistoryActionCreator = (body, token) => {
    return {
        type: postHistoryAction,
        payload: postHistory(body, token),
    };
};
