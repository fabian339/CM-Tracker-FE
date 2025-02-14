import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateAdminRoute = ({component : Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render={(props) => 
        authenticated === true ? <Component {...props} /> : <Redirect to='/' />
    }
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.admin.authenticated
});

PrivateAdminRoute.prototype = {
    user: PropTypes.object
}

export default connect(mapStateToProps)(PrivateAdminRoute);