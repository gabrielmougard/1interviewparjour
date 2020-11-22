import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentSuccessComponent from '../../components/Payment/PaymentSuccess'

// Actions
import { sendProductAction } from './actions'

function PaymentSuccess({
    sendProductAction,
    isProductSent
}) {

    return (
        <PaymentSuccessComponent
            sendProduct={sendProductAction}
            isProductSent={isProductSent}
        />
    )
}

PaymentSuccess.propTypes = {
    sendProductAction: PropTypes.func,
    isProductSent: PropTypes.bool
}

PaymentSuccess.defaultProps = {
    sendProductAction: () => {},
    isProductSent: false
}

const mapDispatchToProps = dispatch => ({
    sendProductAction: (payload) => dispatch(sendProductAction(payload))
})

const mapStateToProps = ({ payment_success }) => ({
    isProductSent: payment_success.isProductSent,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(PaymentSuccess)