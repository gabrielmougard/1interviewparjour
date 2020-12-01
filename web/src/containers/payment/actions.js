import {
    GET_STRIPE_PUB_KEY,
    GET_STRIPE_PUB_KEY_ERROR,
    GET_STRIPE_PUB_KEY_SUCCESS,
} from './constants'

export function getStripePubKeyAction(payload) {
    return {
        type: GET_STRIPE_PUB_KEY,
        payload,
    }
}

export function getStripePubKeyErrorAction(payload) {
    return {
        type: GET_STRIPE_PUB_KEY_ERROR,
        payload,
    }
}

export function getStripePubKeySuccessAction(payload) {
    return {
        type: GET_STRIPE_PUB_KEY_SUCCESS,
        payload,
    }
}