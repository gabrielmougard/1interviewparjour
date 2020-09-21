import {
    VERIFY_IDENTITY_SUCCESS,
    VERIFY_IDENTITY_ERROR
} from './constants'

const initialState = {
    payment: {}
}

function paymentReducer(state = initialState, { type, payload }) {
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
                problemData: payload.data,
                stripePubKey: payload.publicKey
            }
        default:
            return {
                ...state,
            }
    }
}

export default paymentReducer