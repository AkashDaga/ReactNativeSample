/** @format */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import { name as appName } from './app.json';
import { initStore } from './src/redux/store';

export const store = initStore();
const upRedux = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => upRedux);

