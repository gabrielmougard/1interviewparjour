import {
    VERIFY_IDENTITY_SUCCESS,
    VERIFY_IDENTITY_ERROR
} from './constants'

const initialState = {
    payment: {}
}

function paymentCancelReducer(state = initialState, { type, payload }) {
    switch (type) {

        case VERIFY_IDENTITY_ERROR:
            return {
                ...state,
                identityVerified: false
            }

        case VERIFY_IDENTITY_SUCCESS:
            return {
                ...state,
                identityVerified: true,
            }
        default:
            return {
                ...state,
            }
    }
}

export default paymentCancelReducer