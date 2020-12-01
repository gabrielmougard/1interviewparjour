import "regenerator-runtime/runtime";
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    FETCH_INITIAL_PLANNING,
    SAVE_PLANNING,
    FETCH_SUPPORTED_DIFFICULTIES,
    FETCH_SUPPORTED_TOPICS
} from './constants'

import {
    fetchInitialPlanningErrorAction,
    fetchInitialPlanningSuccessAction,
    savePlanningErrorAction,
    savePlanningSuccessAction,
    fetchSupportedDifficultiesErrorAction,
    fetchSupportedDifficultiesSuccessAction,
    fetchSupportedTopicsErrorAction,
    fetchSupportedTopicsSuccessAction
} from './actions'

import { config } from '../../utils/config'
import request from '../../utils/request'

function* fetchInitialPlanning({payload}) {
    //we have an unhashed identifier in a payload to identify the planning of a user
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/planning/fetch_planning?mail=' + payload.mail

    try {
        const response = yield call(request, requestURL)
        if (response.data) {
            yield put(fetchInitialPlanningSuccessAction(response.data))
        } else {
            yield put(fetchInitialPlanningErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(fetchInitialPlanningErrorAction({"msg": err}))
    }
}

function* savePlanning({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/planning/save_planning'
    // payload is like the caledarStates and we also have a mail to identify the planning of the user

    try {
        const response = yield call(request, requestURL, {"method": "POST", "body": JSON.stringify(payload)})
        if (response.success) {
            yield put(savePlanningSuccessAction(response))
        } else {
            yield put(savePlanningErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(savePlanningErrorAction({"msg": err}))
    }
}

function* fetchSupportedDifficulties({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/interviews/interview_difficulties'

    try {
        const response = yield call(request, requestURL)
        if (response.data) {
            yield put(fetchSupportedDifficultiesSuccessAction(response.data))
        } else {
            yield put(fetchSupportedDifficultiesErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(fetchSupportedDifficultiesErrorAction({"msg": err}))
    }
}

function* fetchSupportedTopics({payload}) {
    const { API_URL } = config
    const requestURL = API_URL + '/api/v1/interviews/interview_topics'

    try {
        const response = yield call(request, requestURL)
        if (response.data) {
            yield put(fetchSupportedTopicsSuccessAction(response.data))
        } else {
            yield put(fetchSupportedTopicsErrorAction(response))
        }
    } catch(err) {
        console.error(err)
        yield put(fetchSupportedTopicsErrorAction({"msg": err}))
    }
}

function* planningSaga() {
    yield takeEvery(FETCH_INITIAL_PLANNING, fetchInitialPlanning)
    yield takeEvery(SAVE_PLANNING, savePlanning)
    yield takeEvery(FETCH_SUPPORTED_DIFFICULTIES, fetchSupportedDifficulties)
    yield takeEvery(FETCH_SUPPORTED_TOPICS, fetchSupportedTopics)
}

export default planningSaga
