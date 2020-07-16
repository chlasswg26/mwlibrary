import {
  getAuthorAction,
  postAuthorAction,
  putAuthorAction,
  deleteAuthorAction,
} from './actionTypes';
import {
  getAuthor,
  postAuthor,
  putAuthor,
  deleteAuthor,
} from '../../utils/Http';

export const getAuthorActionCreator = (token) => {
  return {
    type: getAuthorAction,
    payload: getAuthor(token),
  };
};

export const postAuthorActionCreator = (body, token) => {
  return {
    type: postAuthorAction,
    payload: postAuthor(body, token),
  };
};

export const putAuthorActionCreator = (id, body, token) => {
  return {
    type: putAuthorAction,
    payload: putAuthor(id, body, token),
  };
};

export const deleteAuthorActionCreator = (id, token) => {
  return {
    type: deleteAuthorAction,
    payload: deleteAuthor(id, token),
  };
};
