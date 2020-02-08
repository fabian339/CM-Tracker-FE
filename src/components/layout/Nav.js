import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types';


// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//icons 
// import LocationOn from '@material-ui/icons/LocationOn'
// import AddIcon from '@material-ui/icons/Add'
// import HomeIcon from '@material-ui/icons/Home'
// import Notifications from '@material-ui/icons/Notifications'


const Link = require("react-router-dom").Link

export class Nav extends Component {
    render() {
        // const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {/* <Fragment>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/login" >Login</Button>
                        <Button color="inherit" component={Link} to="signup" >Signup</Button>
                    </Fragment> */}
                    <Fragment>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/login" >Login</Button>
                        <Button color="inherit" component={Link} to="register" >Register</Button>
                    </Fragment>
                </Toolbar>
            </AppBar>
        )
    }
}


export default (Nav);
