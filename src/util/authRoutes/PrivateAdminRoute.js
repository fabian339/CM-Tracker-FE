import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateAdminRoute = ({component : Component, authenticatedAdmin, ...rest}) => (
    <Route
    {...rest}
    render={(props) => 
        authenticatedAdmin === true ? <Component {...props} /> : <Redirect to='/UNAUTHORIZED' />
        // authenticated === true ? <Component {...props} /> : <unauthPage />
    }
    />
);

const mapStateToProps = (state) => ({
    authenticatedAdmin: state.user.authenticatedAdmin
});

PrivateAdminRoute.prototype = {
    admin: PropTypes.object
}

export default connect(mapStateToProps)(PrivateAdminRoute);
