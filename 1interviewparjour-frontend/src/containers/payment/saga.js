import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    VERIFY_IDENTITY
} from './constants'

import {
    verifyIdentityErrorAction,
    verifyIdentitySuccessAction
} from './actions'

import { config } from '../../utils/config'
import request from '../../utils/request'
import { getCors } from '../../utils/rulesCors'

function* verifyIdentity({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/identity_check?mail=' + payload.mail + '&token=' + payload.token

    try {
        const response = yield call(request, requestURL)
        if (!response.success) {
            yield put(verifyIdentityErrorAction(response))
        } else {
            yield put(verifyIdentitySuccessAction(response))
        }
    } catch(err) {
        console.error('[route] => /stripe/verify_identity => ERROR => ', err)
        yield put(verifyIdentityErrorAction({"msg": err}))
    }
}

function* paymentSaga() {
    yield takeEvery(VERIFY_IDENTITY, verifyIdentity)
}

export default paymentSaga