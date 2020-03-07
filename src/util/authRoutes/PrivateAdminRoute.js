import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateAdminRoute = (props) => {
    const { authenticated, component, adminFullname, computedMatch :{params : { fullname }} } = props;
    //fix authentication with fullname && id
    const adminAuthentication = (fullname === adminFullname);
    console.log("provate route",adminAuthentication);

    let adminRoute = (authenticated) ? (
        <Route component={component} />
    ) : (
        <Redirect to='/' />
    )

    return (adminRoute)
}

const mapStateToProps = (state) => ({
    authenticated: state.admin.authenticated,
    adminFullname: state.admin.fullname

});

PrivateAdminRoute.prototype = {
    admin: PropTypes.object
}

export default connect(mapStateToProps)(PrivateAdminRoute);