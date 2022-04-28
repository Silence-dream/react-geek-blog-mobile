import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '@/store/reducer';
import { getToken } from '@/utils/token';
const middlewares = composeWithDevTools(applyMiddleware(thunk));
const initialState = {
  login: getToken(),
};
const store = createStore(rootReducer, initialState, middlewares);

export default store;
