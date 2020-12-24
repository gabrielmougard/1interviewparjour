import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import IntroductionComponent from '../../../components/Home/Introduction'

// Actions
import { fetchSupportedLanguagesAction, finalizeSignupAction, closeFromInsideAction} from '../actions'

function Introduction({
    fetchSupportedLanguagesAction,
    finalizeSignupAction,
    closeFromInsideAction,
    supportedLanguages,
    signupCompleted,
    closedFromInside
}) {

    return (
      <IntroductionComponent
        fetchSupportedLanguages={fetchSupportedLanguagesAction}
        finalizeSignup={finalizeSignupAction}
        supportedLanguages={supportedLanguages}
        signupCompleted={signupCompleted}
        closeFromInside={closeFromInsideAction}
        closedFromInside={closedFromInside}
      />
    )
}

Introduction.propTypes = {
    fetchSupportedLanguagesAction: PropTypes.func,
    finalizeSignupAction: PropTypes.func,
    closeFromInsideAction: PropTypes.func,
    supportedLanguages: PropTypes.object,
    signupCompleted: PropTypes.object,
    closedFromInside: PropTypes.number
}

Introduction.defaultProps = {
    fetchSupportedLanguagesAction: () => {},
    finalizeSignupAction: () => {},
    closeFromInsideAction: () => {},
    supportedLanguages: {},
    signupCompleted: {},
    closedFromInside: 0
}

const mapDispatchToProps = dispatch => ({
    fetchSupportedLanguagesAction: (payload) => dispatch(fetchSupportedLanguagesAction(payload)),
    finalizeSignupAction: (payload) => dispatch(finalizeSignupAction(payload)),
    closeFromInsideAction: (payload) => dispatch(closeFromInsideAction(payload))
})

const mapStateToProps = ({ home }) => ({
    supportedLanguages: home.supportedLanguages,
    signupCompleted: home.signupCompleted,
    closedFromInside: home.closedFromInside
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(Introduction)
