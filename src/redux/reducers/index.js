import { combineReducers } from 'redux';
import { logoutAction } from '../actions/actionTypes';

import register from './register';
import verify from './verify';
import login from './login';
import author from './author';
import genre from './genre';
// import books from './books';
// import status from './status';
// import borrow from './borrow';
// import order from './order';

const appReducer = combineReducers({
  register,
  verify,
  login,
  author,
  genre,
//   books,
//   status,
//   borrow,
//   order,
});

const rootReducer = (state, action) => {
  if (action.type === logoutAction) {
    state = null;
  }
  return appReducer(state, action);
};

export default rootReducer;
