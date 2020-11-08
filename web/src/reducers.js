import { combineReducers } from 'redux'

import paymentReducer from './containers/payment/reducer'
import paymentSuccessReducer from './containers/payment_success/reducer'
import paymentCancelReducer from './containers/payment_cancel/reducer'
import homeReducer from './containers/home/reducer'

export default function createReducer() {
  return combineReducers({
    home: homeReducer,
    payment: paymentReducer,
    payment_success: paymentSuccessReducer,
    payment_cancel: paymentCancelReducer
  })
}