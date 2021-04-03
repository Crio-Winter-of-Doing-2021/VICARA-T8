import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const intialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  rootReducer,
  intialState,
  composeEnhancers(applyMiddleware(...middleware))
);
if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, intialState, applyMiddleware(...middleware));
}

export default store;
