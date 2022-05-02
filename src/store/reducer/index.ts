import { combineReducers } from 'redux';

import home from './home';
import login from './login';
import profile from './profile';
import search from './search';
const rootReducer = combineReducers({
  // reducers
  login,
  profile,
  home,
  search,
});

export default rootReducer;
