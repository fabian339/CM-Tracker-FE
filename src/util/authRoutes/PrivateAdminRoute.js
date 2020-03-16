import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateAdminRoute = ({component : Component, authenticated, ...rest}) => (
    <Route
    {...rest}
    render={(props) => 
        authenticated === true ? <Component {...props} /> : <Redirect to='/UNAUTHORIZED' />
        // authenticated === true ? <Component {...props} /> : <unauthPage />
    }
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.admin.authenticated
});

PrivateAdminRoute.prototype = {
    admin: PropTypes.object
}

export default connect(mapStateToProps)(PrivateAdminRoute);


// import React, { Component } from 'react'
// import {Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';



// export class PrivateAdminRoute extends Component {
    
//     render() {
//         const { authenticated, component} = this.props;
//         // console.log("private route", this.props.computedMatch.params.fullname);
//         const {fullname} = this.props.computedMatch.params;
//         // var authUrl = window.location.pathname.includes(localStorage.fullname);


//         let adminRoute = (authenticated) ? (
//             <Route component={component} params={"hejnjn"} />
//         ) : (
//             <Redirect to='/UNAUTHORIZED' />
//         )

//         return (adminRoute)
//     }
// }

// PrivateAdminRoute.propTypes = {
//     authenticated: PropTypes.bool.isRequired,
// }

// const mapStateToProps = (state) => ({
//     authenticated: state.admin.authenticated,
// });


// export default connect(mapStateToProps)(PrivateAdminRoute);