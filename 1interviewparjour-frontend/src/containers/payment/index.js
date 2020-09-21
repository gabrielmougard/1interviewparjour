import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentPortalComponent from '../../components/Payment/PaymentPortal'

// Actions
import { verifyIdentityAction } from './actions'

function PaymentPortal({
  verifyIdentityAction,
  buyAction,
  identityVerified,
  problemData,
  stripePubKey
}) {

    return (
      <PaymentPortalComponent
        verifyIdentity={verifyIdentityAction}
        buy={buyAction}
        identityVerified={identityVerified}
        problemData={problemData}
        stripePubKey={stripePubKey}
      />
    )
}

PaymentPortal.propTypes = {
    verifyIdentityAction: PropTypes.func,
    buyAction: PropTypes.func,
    identityVerified: PropTypes.bool,
    stripePubKey: PropTypes.string,
}

PaymentPortal.defaultProps = {
    verifyIdentityAction: () => {},
    buyAction: () => {},
    verifyIdentity: false,
    stripePubKey: "",
}

const mapDispatchToProps = dispatch => ({
    verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload)),
    buyAction: (payload) => dispatch(buyAction(payload))
})

const mapStateToProps = ({ payment }) => ({
    identityVerified: payment.identityVerified,
    problemData: payment.problemData,
    stripePubKey: payment.stripePubKey,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(PaymentPortal)