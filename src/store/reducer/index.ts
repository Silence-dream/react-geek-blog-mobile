import { combineReducers } from 'redux';

import login from './login';
const rootReducer = combineReducers({
  // reducers
  login,
});

export default rootReducer;
