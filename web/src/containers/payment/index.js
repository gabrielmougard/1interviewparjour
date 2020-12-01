import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentPortalComponent from '../../components/Payment/PaymentPortal'

// Actions
import { getStripePubKeyAction } from './actions'

function PaymentPortal({
  getStripePubKeyAction,
  problemData,
  stripePubKey
}) {

    return (
      <PaymentPortalComponent
        getStripePubKey={getStripePubKeyAction}
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
  getStripePubKeyAction: () => {},
  problemData: {},
  stripePubKey: "",
}

const mapDispatchToProps = dispatch => ({
  getStripePubKeyAction: (payload) => dispatch(getStripePubKeyAction(payload)),
})

const mapStateToProps = ({ payment, mailAuth }) => ({
  problemData: mailAuth.problemData,
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