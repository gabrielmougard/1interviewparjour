import {
    FETCH_SUPPORTED_DIFFICULTIES_SUCCESS,
    FETCH_SUPPORTED_DIFFICULTIES_ERROR,
    FETCH_SUPPORTED_TOPICS_SUCCESS,
    FETCH_SUPPORTED_TOPICS_ERROR,
    FETCH_INITIAL_PLANNING_SUCCESS,
    FETCH_INITIAL_PLANNING_ERROR
} from './constants'

const initialState = {
    planning: {}
}

function planningReducer(state = initialState, { type, payload }) {
    switch (type) {

        case FETCH_SUPPORTED_DIFFICULTIES_SUCCESS:
            return {
                ...state,
                avaiblableDifficulties: payload
            }

        case FETCH_SUPPORTED_DIFFICULTIES_ERROR:
            return {
                ...state,
                avaiblableDifficulties: payload
            }

        case FETCH_SUPPORTED_TOPICS_SUCCESS:
            return {
                ...state,
                availableTopics: payload
            }

        case FETCH_SUPPORTED_TOPICS_ERROR:
            return {
                ...state,
                availableTopics: payload
            }

        case FETCH_INITIAL_PLANNING_SUCCESS:
            return {
                ...state,
                initialPlanningData: payload
            }

        case FETCH_INITIAL_PLANNING_ERROR:
            return {
                ...state,
                initialPlanningData: payload
            }

        default:
            return {
                ...state,
            }
    }
}

export default planningReducer
