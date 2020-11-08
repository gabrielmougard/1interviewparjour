import {
    FETCH_SUPPORTED_LANGUAGES_SUCCESS,
    FETCH_SUPPORTED_LANGUAGES_ERROR,
    FINALIZE_SIGNUP_SUCCESS,
    FINALIZE_SIGNUP_ERROR,
    CLOSE_FROM_INSIDE
} from './constants'

const initialState = {
    home: {}
}

function homeReducer(state = initialState, { type, payload }) {
    switch (type) {

        case FETCH_SUPPORTED_LANGUAGES_ERROR:
            return {
                ...state,
                supportedLanguages: "Could not fetch languages."
            }

        case FETCH_SUPPORTED_LANGUAGES_SUCCESS:
            return {
                ...state,
                supportedLanguages: payload // its [{"language": "...", "description": "..."}, {}, ...]
            }

        case FINALIZE_SIGNUP_ERROR:
            return {
                ...state,
                signupCompleted: payload
            }

        case FINALIZE_SIGNUP_SUCCESS:
            return {
                ...state,
                signupCompleted: payload
            }

        case CLOSE_FROM_INSIDE:
            return {
                ...state,
                closedFromInside: payload
            }

        default:
            return {
                ...state,
            }
    }
}

export default homeReducer