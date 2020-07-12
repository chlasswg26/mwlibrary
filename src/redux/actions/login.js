import { loginAction, tokenAction } from './actionTypes';
import { loginUser, tokenUser } from '../../utils/Http';

export const loginActionCreator = (body) => {
    return {
        type: loginAction,
        payload: loginUser(body)
    };
};

export const tokenActionCreator = (body, token) => {
    return {
        type: tokenAction,
        payload: tokenUser(body, token)
    };
};
