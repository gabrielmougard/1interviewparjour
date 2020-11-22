import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

// Components
import PaymentCancelComponent from '../../components/Payment/PaymentCancel'

function PaymentCancel() {

    return (
        <PaymentCancelComponent/>
    )
}

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = ({ payment_cancel }) => ({
})

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
)

export default compose(
    withRouter,
    withConnect,
)(PaymentCancel)
