import { all } from 'redux-saga/effects'

import homeSaga from './containers/home/saga'
import paymentSaga from './containers/payment/saga'
import paymentSuccessSaga from './containers/payment_success/saga'
import paymentCancelSaga from './containers/payment_cancel/saga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    paymentSaga(),
    paymentSuccessSaga(),
    paymentCancelSaga()
  ])
}