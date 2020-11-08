import {
    FETCH_SUPPORTED_LANGUAGES,
    FETCH_SUPPORTED_LANGUAGES_ERROR,
    FETCH_SUPPORTED_LANGUAGES_SUCCESS,
    FINALIZE_SIGNUP,
    FINALIZE_SIGNUP_ERROR,
    FINALIZE_SIGNUP_SUCCESS,
    CLOSE_FROM_INSIDE
} from './constants'

export function fetchSupportedLanguagesAction(payload) {
    return {
        type: FETCH_SUPPORTED_LANGUAGES,
        payload,
    }
}

export function fetchSupportedLanguagesErrorAction(payload) {
    return {
        type: FETCH_SUPPORTED_LANGUAGES_ERROR,
        payload,
    }
}

export function fetchSupportedLanguagesSuccessAction(payload) {
    return {
        type: FETCH_SUPPORTED_LANGUAGES_SUCCESS,
        payload,
    }
}

export function finalizeSignupAction(payload) {
    return {
        type: FINALIZE_SIGNUP,
        payload,
    }
}

export function finalizeSignupErrorAction(payload) {
    return {
        type: FINALIZE_SIGNUP_ERROR,
        payload,
    }
}

export function finalizeSignupSuccessAction(payload) {
    return {
        type: FINALIZE_SIGNUP_SUCCESS,
        payload,
    }
}

export function closeFromInsideAction(payload) {
    return {
        type: CLOSE_FROM_INSIDE,
        payload: payload + 1
    }
}