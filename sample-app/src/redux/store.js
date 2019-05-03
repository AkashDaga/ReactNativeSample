import { createStore, compose /*applyMiddleware*/ } from 'redux';
import rootReducer from './reducers/index.js';
//import appStateMiddleware from './reducers/appStateMiddleware';

let devToolsExtension = compose;
const enhancerList = [];
if (__DEV__) {
  devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
} else {
  enhancerList.push(devToolsExtension);
}

const composedEnhancer = compose(
  //applyMiddleware(appStateMiddleware),
  ...enhancerList
);

const initStore = () => createStore(rootReducer, {}, composedEnhancer);

module.exports = {
  initStore
};
