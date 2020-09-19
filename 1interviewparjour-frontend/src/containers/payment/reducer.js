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
            console.log("LE PAYLOAD : ")
            console.log(payload)
            return {
                ...state,
                identityVerified: true,
                problemData: payload.data
            }
        default:
            //TODO
            return {
                ...state,
            }
    }
}

export default paymentReducer