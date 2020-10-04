import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import createReducer from './reducers'
import rootSaga from './sagas'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: '1interviewparjour',
  storage,
  blacklist: ['message'],
}
const persistedReducer = persistReducer(persistConfig, createReducer())

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const sagaMiddleware = createSagaMiddleware()

const enhancers = composeEnhancers(
  applyMiddleware(sagaMiddleware, logger),
)

export default (initialState = {}) => {
  let store = createStore(persistedReducer, initialState, enhancers)
  let persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
