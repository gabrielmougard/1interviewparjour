import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    GET_STRIPE_PUB_KEY
} from './constants'

import {
    getStripePubKeyErrorAction,
    getStripePubKeySuccessAction
} from './actions'

import request from '../../utils/request'

function* getStripePubKey({payload}) {

    const requestURL = '/api/v1/stripe/config'

    try {
        const response = yield call(request, requestURL)
        if (response.success) {
            yield put(getStripePubKeySuccessAction(response))
        } else {
            yield put(getStripePubKeyErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(getStripePubKeyErrorAction({"msg": err}))
    }
}

function* paymentSaga() {
    yield takeEvery(GET_STRIPE_PUB_KEY, getStripePubKey)
}

export default paymentSaga
