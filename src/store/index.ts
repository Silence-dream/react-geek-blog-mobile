import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '@/store/reducer';
const middlewares = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middlewares);

export default store;
