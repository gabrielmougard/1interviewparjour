import {
    SEND_PRODUCT,
    SEND_PRODUCT_SUCCESS,
    SEND_PRODUCT_ERROR
} from './constants'

export function sendProductAction(payload) {
    return {
        type: SEND_PRODUCT,
        payload,
    }
}

export function sendProductErrorAction(payload) {
    return {
        type: SEND_PRODUCT_ERROR,
        payload,
    }
}

export function sendProductSuccessAction(payload) {
    return {
        type: SEND_PRODUCT_SUCCESS,
        payload,
    }
}
