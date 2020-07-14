import {
    getUserByIdAction,
    putUserAction,
} from './actionTypes';
import {
    getUserById,
    putUser,
} from '../../utils/Http';

export const getUserByIdActionCreator = (id, token) => {
    return {
        type: getUserByIdAction,
        payload: getUserById(id, token),
    };
};

export const putUserActionCreator = (id, body, token) => {
    return {
        type: putUserAction,
        payload: putUser(id, body, token),
    };
};
