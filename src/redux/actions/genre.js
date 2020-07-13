import {
  getGenreAction,
  getGenreByIdAction,
  postGenreAction,
  putGenreAction,
  deleteGenreAction,
} from './actionTypes';
import {
    getGenre,
    getGenreById,
    postGenre,
    putGenre,
    deleteGenre
} from '../../utils/Http';

export const getGenreActionCreator = (token) => {
  return {
    type: getGenreAction,
    payload: getGenre(token),
  };
};

export const getGenreByIdActionCreator = (id, token) => {
  return {
    type: getGenreByIdAction,
    payload: getGenreById(id, token),
  };
};

export const postGenreActionCreator = (body, token) => {
  return {
    type: postGenreAction,
    payload: postGenre(body, token),
  };
};

export const putGenreActionCreator = (id, body, token) => {
  return {
    type: putGenreAction,
    payload: putGenre(id, body, token),
  };
};

export const deleteGenreActionCreator = (id, token) => {
  return {
    type: deleteGenreAction,
    payload: deleteGenre(id, token),
  };
};
