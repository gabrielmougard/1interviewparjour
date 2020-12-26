import React from 'react'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import { PlanningComponent as DesktopPlanning } from '../../components/Planning/Desktop/index'
import { PlanningComponent as MobilePlanning } from '../../components/Planning/Mobile/index'

// Actions
import { savePlanningAction, fetchInitialPlanningAction, fetchSupportedTopicsAction, fetchSupportedDifficultiesAction} from './actions'

function Planning({
  savePlanningAction,
  fetchInitialPlanningAction,
  fetchSupportedTopicsAction,
  fetchSupportedDifficultiesAction,
  availableTopics,
  avaiblableDifficulties,
  initialPlanningData}) {

  const isPhone = useMediaQuery({
    query: '(max-width: 479px)'
  })
  let planningComponent
  if (isPhone) {
    planningComponent =
      <MobilePlanning
        savePlanning={savePlanningAction}
        fetchInitialPlanning={fetchInitialPlanningAction}
        getTopics={fetchSupportedTopicsAction}
        getDifficulties={fetchSupportedDifficultiesAction}
        availableTopics={availableTopics}
        avaiblableDifficulties={avaiblableDifficulties}
        initialPlanningData={initialPlanningData}
      />
  } else {
    planningComponent =
      <DesktopPlanning
        savePlanning={savePlanningAction}
        fetchInitialPlanning={fetchInitialPlanningAction}
        getTopics={fetchSupportedTopicsAction}
        getDifficulties={fetchSupportedDifficultiesAction}
        availableTopics={availableTopics}
        avaiblableDifficulties={avaiblableDifficulties}
        initialPlanningData={initialPlanningData}
      />
  }
  // do the window size differentiation here for mobile view or desktop view (for now just desktop view using the fullcalendar.io feature)
  return (
    <>
    {planningComponent}
    </>
  )
}


Planning.propTypes = {
  savePlanningAction: PropTypes.func,
  fetchInitialPlanningAction: PropTypes.func,
  fetchSupportedTopicsAction: PropTypes.func,
  fetchSupportedDifficultiesAction: PropTypes.func,
  availableTopics: PropTypes.array,
  avaiblableDifficulties: PropTypes.array,
  initialPlanningData: PropTypes.array,
}

Planning.defaultProps = {
  savePlanningAction: () => {},
  fetchInitialPlanningAction: () => {},
  fetchSupportedTopicsAction: () => {},
  fetchSupportedDifficultiesAction: () => {},
  availableTopics: [],
  avaiblableDifficulties: [],
  initialPlanningData: []
}

const mapDispatchToProps = dispatch => ({
  savePlanningAction: (payload) => dispatch(savePlanningAction(payload)),
  fetchInitialPlanningAction: (payload) => dispatch(fetchInitialPlanningAction(payload)),
  fetchSupportedTopicsAction: (payload) => dispatch(fetchSupportedTopicsAction(payload)),
  fetchSupportedDifficultiesAction: (payload) => dispatch(fetchSupportedDifficultiesAction(payload))
})

const mapStateToProps = ({ planning }) => ({
  availableTopics: planning.availableTopics,
  avaiblableDifficulties: planning.avaiblableDifficulties,
  initialPlanningData: planning.initialPlanningData
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withRouter,
  withConnect,
)(Planning)
