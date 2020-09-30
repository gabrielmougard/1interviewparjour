import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentCancelComponent from '../../components/Payment/PaymentCancel'

// Actions
import { verifyIdentityAction } from './actions'

function PaymentCancel({
    verifyIdentityAction,
    identityVerified,
}) {

    return (
        <PaymentCancelComponent
            verifyIdentity={verifyIdentityAction}
            identityVerified={identityVerified}
        />
    )
}

PaymentCancel.propTypes = {
    verifyIdentityAction: PropTypes.func,
    identityVerified: PropTypes.bool
}

PaymentCancel.defaultProps = {
    verifyIdentityAction: () => {},
    verifyIdentity: false
}

const mapDispatchToProps = dispatch => ({
    verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload))
})

const mapStateToProps = ({ payment_cancel }) => ({
    identityVerified: payment_cancel.identityVerified
})

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
)

export default compose(
    withRouter,
    withConnect,
)(PaymentCancel)
