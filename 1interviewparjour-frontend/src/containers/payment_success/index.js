import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentSuccessComponent from '../../components/Payment/PaymentSuccess'

// Actions
import { verifyIdentityAction } from './actions'

function PaymentSuccess({
    verifyIdentityAction,
    identityVerified,
}) {

    return (
        <PaymentSuccessComponent
            verifyIdentity={verifyIdentityAction}
            identityVerified={identityVerified}
        />
    )
}

PaymentSuccess.propTypes = {
    verifyIdentityAction: PropTypes.func,
    identityVerified: PropTypes.bool,
}

PaymentSuccess.defaultProps = {
    verifyIdentityAction: () => {},
    verifyIdentity: false,
}

const mapDispatchToProps = dispatch => ({
    verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload)),
})

const mapStateToProps = ({ payment_success }) => ({
    identityVerified: payment_success.identityVerified,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(PaymentSuccess)