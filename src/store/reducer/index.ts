import { combineReducers } from 'redux';

import home from './home';
import login from './login';
import profile from './profile';
const rootReducer = combineReducers({
  // reducers
  login,
  profile,
  home,
});

export default rootReducer;
