import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import { PlanningComponent as DesktopPlanning } from '../../components/Planning/Desktop/index'
import { PlanningComponent as MobilePlanning } from '../../components/Planning/Mobile/index'

// Actions
//import {} from './actions'

function Planning() {

    // do the window size differentiation here for mobile view or desktop view (for now just desktop view using the fullcalendar.io feature)
    return (
      <DesktopPlanning />
    )
}

/*
Planning.propTypes = {

}

Planning.defaultProps = {

}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = ({ planning }) => ({

})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(Planning)
*/
export default Planning