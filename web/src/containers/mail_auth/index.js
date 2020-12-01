import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import MailAuthComponent from '../../components/MailAuth/index'

// Actions
import { verifyIdentityAction } from './actions'

function MailAuth({
    childComponent, // direct props
    verifyIdentityAction, // saga
    identityVerified // from redux
}) {

    return (
      <MailAuthComponent
        childComponent={childComponent}
        verifyIdentity={verifyIdentityAction}
        identityVerified={identityVerified}
      />
    )
}

MailAuth.propTypes = {
  verifyIdentityAction: PropTypes.func,
  identityVerified: PropTypes.bool
}

MailAuth.defaultProps = {
  verifyIdentityAction: () => {},
  identityVerified: undefined
}

const mapDispatchToProps = dispatch => ({
  verifyIdentityAction: (payload) => dispatch(verifyIdentityAction(payload)),
})

const mapStateToProps = ({ mailAuth }) => ({
  identityVerified: mailAuth.identityVerified
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(MailAuth)
