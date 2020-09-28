import { combineReducers } from 'redux'

import paymentReducer from './containers/payment/reducer'
import paymentSuccessReducer from './containers/payment_success/reducer'

export default function createReducer() {
  return combineReducers({
    payment: paymentReducer,
    payment_success: paymentSuccessReducer,
  })
}