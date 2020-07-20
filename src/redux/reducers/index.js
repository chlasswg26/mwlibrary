import { combineReducers } from 'redux';

import register from './register';
import verify from './verify';
import login from './login';
import author from './author';
import genre from './genre';
import book from './book';
import user from './user';
import historys from './historys';

const rootReducer = combineReducers({
  register,
  verify,
  login,
  author,
  genre,
  book,
  user,
  historys,
});

export default rootReducer;
