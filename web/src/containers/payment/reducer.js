import {
    GET_STRIPE_PUB_KEY_SUCCESS,
    GET_STRIPE_PUB_KEY_ERROR
} from './constants'

const initialState = {
    payment: {}
}

function paymentReducer(state = initialState, { type, payload }) {
    switch (type) {

        case GET_STRIPE_PUB_KEY_ERROR:
            return {
                ...state
            }

        case GET_STRIPE_PUB_KEY_SUCCESS:
            return {
                ...state,
                stripePubKey: payload.publicKey
            }
        default:
            return {
                ...state,
            }
    }
}

export default paymentReducer