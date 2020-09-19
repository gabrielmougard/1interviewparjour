import { all } from 'redux-saga/effects'

import paymentSaga from './containers/payment/saga'

export default function* rootSaga() {
  yield all([
    paymentSaga(),
  ])
}