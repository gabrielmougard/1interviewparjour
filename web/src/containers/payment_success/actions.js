import {
    SEND_PRODUCT,
    SEND_PRODUCT_SUCCESS,
    SEND_PRODUCT_ERROR,
    VERIFY_IDENTITY,
    VERIFY_IDENTITY_ERROR,
    VERIFY_IDENTITY_SUCCESS,
} from './constants'

export function verifyIdentityAction(payload) {
    return {
        type: VERIFY_IDENTITY,
        payload,
    }
}

export function verifyIdentityErrorAction(payload) {
    return {
        type: VERIFY_IDENTITY_ERROR,
        payload,
    }
}

export function verifyIdentitySuccessAction(payload) {
    return {
        type: VERIFY_IDENTITY_SUCCESS,
        payload,
    }
}

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
