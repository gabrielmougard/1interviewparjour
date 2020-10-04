import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// the following polyfills are included for IE11 compatibility
import 'core-js/features/string/starts-with'; // used by react-router
import 'core-js/features/string/ends-with'; // used by components/Doc/ThemeProps
import configureStore from './configureStore'
import App from './App';

if (typeof window !== 'undefined') {
  const OfflinePluginRuntime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  OfflinePluginRuntime.install();
}

const element = document.getElementById('content');
const { NODE_ENV: env } = process.env;
const { store, persistor } = configureStore()
// ReactDOM's hydrate method is used when html is already present on the page.
// https://reactjs.org/docs/react-dom.html#hydrate
if (env === 'production') {
  ReactDOM.hydrate(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  , element);
} else {
  ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, element);
}

document.body.classList.remove('loading');
