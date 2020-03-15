import React, { Component } from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export class PrivateAdminRoute extends Component {
    render() {
        const { authenticated, component} = this.props;
        // console.log("private route");
        var authUrl = window.location.pathname.includes(localStorage.fullname);

        let adminRoute = (authenticated && authUrl) ? (
            <Route component={component} />
        ) : (
            <Redirect to='/UNAUTHORIZED' />
        )

        return (adminRoute)
    }
}

PrivateAdminRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    authenticated: state.admin.authenticated,
});


export default connect(mapStateToProps)(PrivateAdminRoute);