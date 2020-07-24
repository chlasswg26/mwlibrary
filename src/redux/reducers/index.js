import { combineReducers } from 'redux';
import { logoutAction } from "../actions/actionTypes";

import register from './register';
import verify from './verify';
import login from './login';
import author from './author';
import genre from './genre';
import book from './book';
import user from './user';
import historys from './historys';

const appReducer = combineReducers({
  register,
  verify,
  login,
  author,
  genre,
  book,
  user,
  historys,
});

const rootReducer = (state, action) => {
  if (action.type === logoutAction) {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;
