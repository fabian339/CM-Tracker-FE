import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


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

const styles = {
    navContainer: {
        backgroundColor: "mediumturquoise"
    },
    navButtons: {
        fontSize: "initial",
        color: "dimgray",
        fontWeight: "600"
    },
    title: {
        flexGrow: 1,
      }
};

export class Nav extends Component {
    render() {
        // const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar style={styles.navContainer}>
                    {/* <Fragment>
                        <Button color="inherit" component={Link} to="/" >Home</Button>
                        <Button color="inherit" component={Link} to="/login" >Login</Button>
                        <Button color="inherit" component={Link} to="signup" >Signup</Button>
                    </Fragment> */}
                    <Typography variant="h6" style={styles.title}>
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/" >CM-Tracker</Button>
                    </Typography>
                    <Fragment >
                        {/* <Button style={styles.navButtons} color="inherit" component={Link} to="/" >Home</Button> */}
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/login" >Login</Button>
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/registration" > Register</Button>
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/documentation" > Documentation</Button>

                    </Fragment>
                </Toolbar>
            </AppBar>
        )
    }
}


export default (Nav);
