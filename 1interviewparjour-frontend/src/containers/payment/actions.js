import {
    VERIFY_IDENTITY,
    VERIFY_IDENTITY_ERROR,
    VERIFY_IDENTITY_SUCCESS,
    BUY
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

export function buyAction(payload) {
    return {
        type: BUY,
        payload,
    }
}