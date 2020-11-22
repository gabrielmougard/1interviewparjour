import {
    SAVE_PLANNING,
    SAVE_PLANNING_SUCCESS,
    SAVE_PLANNING_ERROR,
    FETCH_INITIAL_PLANNING,
    FETCH_INITIAL_PLANNING_SUCCESS,
    FETCH_INITIAL_PLANNING_ERROR,
    FETCH_SUPPORTED_DIFFICULTIES,
    FETCH_SUPPORTED_DIFFICULTIES_ERROR,
    FETCH_SUPPORTED_DIFFICULTIES_SUCCESS,
    FETCH_SUPPORTED_TOPICS,
    FETCH_SUPPORTED_TOPICS_ERROR,
    FETCH_SUPPORTED_TOPICS_SUCCESS
} from './constants'

export function fetchInitialPlanningAction(payload) {
    return {
        type: FETCH_INITIAL_PLANNING,
        payload
    }
}

export function fetchInitialPlanningSuccessAction(payload) {
    return {
        type: FETCH_INITIAL_PLANNING_SUCCESS,
        payload
    }
}

export function fetchInitialPlanningErrorAction(payload) {
    return {
        type: FETCH_INITIAL_PLANNING_ERROR,
        payload
    }
}

export function savePlanningAction(payload) {
    return {
        type: SAVE_PLANNING,
        payload
    }
}

export function savePlanningSuccessAction(payload) {
    return {
        type: SAVE_PLANNING_SUCCESS,
        payload
    }
}

export function savePlanningErrorAction(payload) {
    return {
        type: SAVE_PLANNING_ERROR,
        payload
    }
}

export function fetchSupportedDifficultiesAction(payload) {
    return {
        type: FETCH_SUPPORTED_DIFFICULTIES,
        payload,
    }
}

export function fetchSupportedDifficultiesSuccessAction(payload) {
    return {
        type: FETCH_SUPPORTED_DIFFICULTIES_SUCCESS,
        payload,
    }
}

export function fetchSupportedDifficultiesErrorAction(payload) {
    return {
        type: FETCH_SUPPORTED_DIFFICULTIES_ERROR,
        payload,
    }
}

export function fetchSupportedTopicsAction(payload) {
    return {
        type: FETCH_SUPPORTED_TOPICS,
        payload,
    }
}

export function fetchSupportedTopicsSuccessAction(payload) {
    return {
        type: FETCH_SUPPORTED_TOPICS_SUCCESS,
        payload,
    }
}

export function fetchSupportedTopicsErrorAction(payload) {
    return {
        type: FETCH_SUPPORTED_TOPICS_ERROR,
        payload,
    }
}
