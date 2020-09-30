import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    SEND_PRODUCT,
    VERIFY_IDENTITY,
} from './constants'

import {
    verifyIdentityErrorAction,
    verifyIdentitySuccessAction,
    sendProductSuccessAction,
    sendProductErrorAction
} from './actions'

import { config } from '../../utils/config'
import request from '../../utils/request'

function* verifyIdentity({payload}) {
    const { API_URL } = config
    const requestURLIdentity = API_URL + '/api/v1/identity_check?mail=' + payload.mail + '&token=' + payload.token
    const requestURLStripePubKey = API_URL + '/stripe/config'
    try {
        const responseIdentity = yield call(request, requestURLIdentity)
        if (responseIdentity.success) {
            //fetch stripe public key
            const responseStripeKey = yield call(request, requestURLStripePubKey)
            if (responseStripeKey.success) {
                yield put(verifyIdentitySuccessAction({...responseIdentity, ...responseStripeKey}))
            } else {
                yield put(verifyIdentityErrorAction(responseIdentity))
            }
        } else {
            yield put(verifyIdentityErrorAction(responseIdentity))
        }
    } catch(err) {
        console.error(err)
        yield put(verifyIdentityErrorAction({"msg": err}))
    }
}

function* sendProduct({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + "/stripe/success?session_id=" + payload.session_id + "&problem_id="+ payload.problem_id + "&mail=" + payload.mail + "&token=" + payload.token
    try {
        const response = yield call(request, requestURL)
        if (response.status == 200) {
            yield put(sendProductSuccessAction(response))
        } else {
            yield put(sendProductErrorAction(response))
        }
    } catch(err) {
        yield put(sendProductErrorAction(err))
    }
}

function* paymentSuccessSaga() {
    yield takeEvery(VERIFY_IDENTITY, verifyIdentity)
    yield takeEvery(SEND_PRODUCT, sendProduct)
}

export default paymentSuccessSaga