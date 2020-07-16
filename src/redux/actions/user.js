import {
    putUserAction,
} from './actionTypes';
import {
    putUser,
} from '../../utils/Http';

export const putUserActionCreator = (id, body, token) => {
    return {
        type: putUserAction,
        payload: putUser(id, body, token),
    };
};
