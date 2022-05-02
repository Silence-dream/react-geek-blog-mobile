import { combineReducers } from 'redux';

import login from './login';
import profile from './profile';
const rootReducer = combineReducers({
  // reducers
  login,
  profile,
});

export default rootReducer;
