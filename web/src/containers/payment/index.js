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
  identityVerified,
  problemData,
  stripePubKey
}) {

    return (
      <PaymentPortalComponent
        verifyIdentity={verifyIdentityAction}
        identityVerified={identityVerified}
        problemData={problemData}
        stripePubKey={stripePubKey}
      />
    )
}

PaymentPortal.propTypes = {
  verifyIdentityAction: PropTypes.func,
  identityVerified: PropTypes.bool,
  problemData: PropTypes.object,
  stripePubKey: PropTypes.string,
}

PaymentPortal.defaultProps = {
  verifyIdentityAction: () => {},
  identityVerified: false,
  problemData: {},
  stripePubKey: "",
}

const mapDispatchToProps = dispatch => ({
  verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload)),
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