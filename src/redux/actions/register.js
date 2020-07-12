import { registerAction } from './actionTypes';
import { registerUser } from '../../utils/Http';

export const registerActionCreator = (data) => {
    return {
        type: registerAction,
        payload: registerUser(data),
    };
};
