import {
    VERIFY_IDENTITY_SUCCESS,
    VERIFY_IDENTITY_ERROR,
    SEND_PRODUCT_SUCCESS,
    SEND_PRODUCT_ERROR
} from './constants'

const initialState = {
    payment: {}
}

function paymentSuccessReducer(state = initialState, { type, payload }) {
    switch (type) {

        case SEND_PRODUCT_ERROR:
            return {
                ...state,
                isProductSent: false
            }
        case SEND_PRODUCT_SUCCESS:
            return {
                ...state,
                isProductSent: true
            }

        default:
            return {
                ...state,
            }
    }
}

export default paymentSuccessReducer