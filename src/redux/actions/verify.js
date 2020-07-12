import { verifyAction } from './actionTypes';
import { verifyUser } from '../../utils/Http';

export const verifyActionCreator = (data) => {
    return {
        type: verifyAction,
        payload: verifyUser(data),
    };
};
