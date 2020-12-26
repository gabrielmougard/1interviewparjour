import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import ProComponent from '../../../components/Home/Pro'

// Actions
import { fetchSupportedLanguagesAction, finalizeSignupAction, closeFromInsideAction} from '../actions'
import { getStripePubKeyAction } from '../../payment/actions'

function Pro({
    fetchSupportedLanguagesAction,
    finalizeSignupAction,
    closeFromInsideAction,
    supportedLanguages,
    signupCompleted,
    closedFromInside,
    getStripePubKeyAction,
    stripePubKey
}) {

    return (
      <ProComponent
        fetchSupportedLanguages={fetchSupportedLanguagesAction}
        finalizeSignup={finalizeSignupAction}
        supportedLanguages={supportedLanguages}
        signupCompleted={signupCompleted}
        closeFromInside={closeFromInsideAction}
        closedFromInside={closedFromInside}
        getStripePubKey={getStripePubKeyAction}
        stripePubKey={stripePubKey}
      />
    )
}

Pro.propTypes = {
  fetchSupportedLanguagesAction: PropTypes.func,
  finalizeSignupAction: PropTypes.func,
  closeFromInsideAction: PropTypes.func,
  getStripePubKeyAction: PropTypes.func,
  supportedLanguages: PropTypes.object,
  signupCompleted: PropTypes.object,
  closedFromInside: PropTypes.number,
  stripePubKey: PropTypes.string,
}

Pro.defaultProps = {
  fetchSupportedLanguagesAction: () => {},
  finalizeSignupAction: () => {},
  closeFromInsideAction: () => {},
  getStripePubKeyAction: () => {},
  supportedLanguages: {},
  signupCompleted: {},
  closedFromInside: 0,
  stripePubKey: "",
}

const mapDispatchToProps = dispatch => ({
  fetchSupportedLanguagesAction: (payload) => dispatch(fetchSupportedLanguagesAction(payload)),
  finalizeSignupAction: (payload) => dispatch(finalizeSignupAction(payload)),
  closeFromInsideAction: (payload) => dispatch(closeFromInsideAction(payload)),
  getStripePubKeyAction: (payload) => dispatch(getStripePubKeyAction(payload))
})

const mapStateToProps = ({ home, payment }) => ({
  supportedLanguages: home.supportedLanguages,
  signupCompleted: home.signupCompleted,
  closedFromInside: home.closedFromInside,
  stripePubKey: payment.stripePubKey
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(Pro)
