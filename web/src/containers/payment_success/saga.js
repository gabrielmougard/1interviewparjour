import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    SEND_PRODUCT
} from './constants'

import {
    sendProductSuccessAction,
    sendProductErrorAction
} from './actions'

import request from '../../utils/request'

function* sendProduct({payload}) {

    const requestURL = "/api/v1/stripe/success?session_id=" + payload.session_id + "&problem_id="+ payload.problem_id + "&mail=" + payload.mail + "&token=" + payload.token
    try {
        const response = yield call(request, requestURL)
        if (response.status === 200) {
            yield put(sendProductSuccessAction(response))
        } else {
            yield put(sendProductErrorAction(response))
        }
    } catch(err) {
        yield put(sendProductErrorAction(err))
    }
}

function* paymentSuccessSaga() {
    yield takeEvery(SEND_PRODUCT, sendProduct)
}

export default paymentSuccessSaga