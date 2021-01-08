import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    VERIFY_IDENTITY
} from './constants'

import {
    verifyIdentityErrorAction,
    verifyIdentitySuccessAction
} from './actions'

import request from '../../utils/request'

function* verifyIdentity({payload}) {

    const requestURLIdentity = '/api/v1/identity/identity_check?mail=' + payload.mail + '&token=' + payload.token

    try {
        const responseIdentity = yield call(request, requestURLIdentity)
        if (responseIdentity.success) {
            yield put(verifyIdentitySuccessAction(responseIdentity))
        } else {
            yield put(verifyIdentityErrorAction(responseIdentity))
        }
    } catch(err) {
        console.error(err)
        yield put(verifyIdentityErrorAction({"msg": err}))
    }
}

function* mailAuthSaga() {
    yield takeEvery(VERIFY_IDENTITY, verifyIdentity)
}

export default mailAuthSaga