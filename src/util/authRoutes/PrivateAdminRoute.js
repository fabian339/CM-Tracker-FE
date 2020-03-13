import React, { Component, Fragment } from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export class PrivateAdminRoute extends Component {
    constructor(){
        super();
        this.state = {
            fullname: '',
            pathAdminName:''
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if (this.props.adminFullname !== nextProps.adminFullname) {
    //         console.log("Private Next props",this.nextProps)
    //         this.setState({ 
    //             fullname: nextProps.adminFullname,
    //             pathAdminName: nextProps.computedMatch.params.fullname
    //         })
    //     }
        
    // }

    render() {
        const { authenticated, component} = this.props;
        // const { fullname, pathAdminName } = this.state;
        //fix authentication with fullname && id
        // let adminAuthentication = (authenticated && (fullname === pathAdminName));
        // console.log("This is trueee",fullname, pathAdminName)
        console.log("private route");

        let adminRoute = (authenticated) ? (
            <Route component={component} />
        ) : (
            <Redirect to='/' />
        )

        return (adminRoute)
    }
}

PrivateAdminRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    // adminFullname: PropTypes.string.isRequired
}


const mapStateToProps = (state) => ({
    // admin: state.admin,
    authenticated: state.admin.authenticated,
    // adminFullname: state.admin.fullname

});


export default connect(mapStateToProps)(PrivateAdminRoute);