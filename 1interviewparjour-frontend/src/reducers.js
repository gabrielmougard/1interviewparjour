import { combineReducers } from 'redux'

import paymentReducer from './containers/payment/reducer'

export default function createReducer() {
  return combineReducers({
    payment: paymentReducer,
  })
}