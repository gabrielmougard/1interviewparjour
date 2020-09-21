import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    VERIFY_IDENTITY,
    BUY
} from './constants'

import {
    verifyIdentityErrorAction,
    verifyIdentitySuccessAction
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
            console.log({...responseIdentity, ...responseStripeKey})
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

function* buyProduct({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/identity_check?mail=' + payload.mail + '&token=' + payload.token
}

function* paymentSaga() {
    yield takeEvery(VERIFY_IDENTITY, verifyIdentity)
    yield takeEvery(BUY, buyProduct)
}

export default paymentSaga