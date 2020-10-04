import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentSuccessComponent from '../../components/Payment/PaymentSuccess'

// Actions
import { verifyIdentityAction, sendProductAction } from './actions'

function PaymentSuccess({
    verifyIdentityAction,
    sendProductAction,
    identityVerified,
    isProductSent
}) {

    return (
        <PaymentSuccessComponent
            verifyIdentity={verifyIdentityAction}
            sendProduct={sendProductAction}
            identityVerified={identityVerified}
            isProductSent={isProductSent}
        />
    )
}

PaymentSuccess.propTypes = {
    verifyIdentityAction: PropTypes.func,
    sendProductAction: PropTypes.func,
    identityVerified: PropTypes.bool,
    isProductSent: PropTypes.bool
}

PaymentSuccess.defaultProps = {
    verifyIdentityAction: () => {},
    sendProductAction: () => {},
    verifyIdentity: false,
    isProductSent: false
}

const mapDispatchToProps = dispatch => ({
    verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload)),
    sendProductAction: (payload) => dispatch(sendProductAction(payload))
})

const mapStateToProps = ({ payment_success }) => ({
    identityVerified: payment_success.identityVerified,
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