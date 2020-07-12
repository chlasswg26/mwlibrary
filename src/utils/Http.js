import Axios from 'axios';

const BACKEND = process.env.REACT_APP_API_URL;
const AUTH_ENDPOINT = BACKEND + '/auth';
const AUTHOR_ENDPOINT = BACKEND + '/author';
const GENRE_ENDPOINT = BACKEND + '/genre';

export const registerUser = (body) => {
    return Axios.post(`${AUTH_ENDPOINT}/register`, body);
};

export const verifyUser = (body) => {
    return Axios.post(`${AUTH_ENDPOINT}/verify`, body);
};

export const loginUser = (body) => {
    return Axios.post(`${AUTH_ENDPOINT}/login`, body);
};

export const tokenUser = (body, token) => {
    return Axios.post(`${AUTH_ENDPOINT}/token`, body, {
        headers: {
            Authorization: token,
        },
    });
};

export const getAuthor = (token) => {
  return Axios.get(`${AUTHOR_ENDPOINT}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postAuthor = (body, token) => {
  return Axios.post(`${AUTHOR_ENDPOINT}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putAuthor = (id, body, token) => {
  return Axios.put(`${AUTHOR_ENDPOINT}/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteAuthor = (id, token) => {
  return Axios.delete(`${AUTHOR_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getGenre = (token) => {
  return Axios.get(`${GENRE_ENDPOINT}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postGenre = (body, token) => {
  return Axios.post(`${GENRE_ENDPOINT}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putGenre = (id, body, token) => {
  return Axios.put(`${GENRE_ENDPOINT}/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteGenre = (id, token) => {
  return Axios.delete(`${GENRE_ENDPOINT}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
