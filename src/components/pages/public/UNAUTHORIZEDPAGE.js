import React, { Component, Fragment } from 'react'
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export class UNAUTHORIZEDPAGE extends Component {


    render() {
        return (
            <p style={{fontSize:"100px"}}>UNAUTHORIZED</p>
        )
    }
}



export default UNAUTHORIZEDPAGE;