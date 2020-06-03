import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { logoutUser } from '../../redux/actions/userActions'

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';




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
      },
    menuItem: {
        fontSize: "13px",
        fontWeight: "600",
        color: "dimgray" ,
    }   
};

export class Nav extends Component {


    state = {
        anchorEl: null,
        open: false,
      };
    
    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget});
    };


    handleRequestClose = (even) => {
        console.log("Nav", even)
        this.setState({ open: false });
    };


    handleLogOut = () => {
        console.log("logout called")
        this.props.logoutUser();
    }


    render() {
        const { 
            authenticatedAdmin,
        } = this.props;
        // console.log("NAvv", this.props);
        return (
            <AppBar>
                <Toolbar style={styles.navContainer}>
                    <Typography variant="h6" style={styles.title}>
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/" >CM-Tracker</Button>
                    </Typography>

                        { authenticatedAdmin ? (
                            <Fragment>
                                <Button style={styles.navButtons} color="inherit" component={Link} to={`/signatures/${localStorage.fullname}`} >View Signatures</Button>
                                <Tooltip title="Log Out" aria-label="add">
                                    <Button style={{color: "dimgray"}} onClick={this.handleLogOut} component={Link} to="/" >
                                        <KeyboardReturnIcon />
                                    </Button>
                                </Tooltip>
                            </Fragment>
                        ) : (
                            <Fragment >
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/signatures" >Signatures</Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/login" >Login</Button>
                            </Fragment>
                        )
                    }
                    
                </Toolbar>
            </AppBar>
        )
    }
}


Nav.propTypes = {
    authenticatedAdmin: PropTypes.bool,
    user: PropTypes.object,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    authenticatedAdmin: state.user.authenticatedAdmin,
    user: state.user
})

export default connect(mapStateToProps, {logoutUser})(Nav);