import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    FINALIZE_SIGNUP,
    FETCH_SUPPORTED_LANGUAGES
} from './constants'

import {
    finalizeSignupErrorAction,
    finalizeSignupSuccessAction,
    fetchSupportedLanguagesErrorAction,
    fetchSupportedLanguagesSuccessAction
} from './actions'

import request from '../../utils/request'

function* fetchSupportedLanguages({payload}) {

    const requestURLSupportedLanguages = '/api/v1/languages/supported_languages'

    try {
        const response = yield call(request, requestURLSupportedLanguages)
        if (response.data) {
            yield put(fetchSupportedLanguagesSuccessAction(response.data))
        } else {
            yield put(fetchSupportedLanguagesErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(fetchSupportedLanguagesErrorAction({"msg": err}))
    }
}

function* finalizeSignup({payload}) {
    const requestURLSignup = '/api/v1/signup'
    // payload is like : {"mail": "...", "languages" : ["...", ... , "..."]}

    try {
        const response = yield call(request, requestURLSignup, {"method": "POST", "body": JSON.stringify(payload)})
        if (response.created) {
            yield put(finalizeSignupSuccessAction(response))
        } else {
            yield put(finalizeSignupErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(finalizeSignupErrorAction({"msg": err}))
    }
}

function* homeSaga() {
    yield takeEvery(FETCH_SUPPORTED_LANGUAGES, fetchSupportedLanguages)
    yield takeEvery(FINALIZE_SIGNUP, finalizeSignup)
}

export default homeSaga
