import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { logoutAdmin } from '../../redux/actions/adminActions'

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

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
    constructor(){
        super();
        this.state = {
            adminFullname: '',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.adminFullname !== this.props.adminFullname) {
            console.log("NAV Next props",nextProps)
            this.setState({ 
                adminFullname: nextProps.adminFullname,
            })
        }
    }


    handleLogOut = () => {
        console.log("logout called")
        this.props.logoutAdmin();
    }


    render() {
        const { 
            authenticatedUser, 
            authenticatedAdmin,
        } = this.props;
        // const { adminFullname } = this.state;
        // console.log("NAvv", this.props);

        return (
            <AppBar>
                <Toolbar style={styles.navContainer}>
                    <Typography variant="h6" style={styles.title}>
                        <Button style={styles.navButtons} color="inherit" component={Link} to="/" >CM-Tracker</Button>
                    </Typography>
                    { authenticatedUser ? (
                        <Fragment>
                            <Button style={styles.navButtons} color="inherit" component={Link} to="/documentation" > Documentation</Button>
                            <Tooltip title="Log Out" aria-label="add">
                                <Button color="inherit" onClick={this.handleLogOut} component={Link} to="/" >
                                    <KeyboardReturnIcon />
                                </Button>
                            </Tooltip>
                        </Fragment>
                    ) : (
                        authenticatedAdmin ? (
                            <Fragment>
                                {/* <Button style={styles.navButtons} color="inherit" component={Link} to="/" > {adminFullname.replace(/_/g, " ")} </Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to={`/admin/${adminFullname}/modules`} > MODULES </Button> */}
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/" > ACTIVITIES </Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/documentation" > Documentation</Button>

                                <Tooltip title="Log Out" aria-label="add">
                                    <Button color="inherit" onClick={this.handleLogOut} component={Link} to="/" >
                                        <KeyboardReturnIcon />
                                    </Button>
                                </Tooltip>
                            </Fragment>
                        ) : (
                            <Fragment >
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/login" >Login</Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/registration" > Register</Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/documentation" > Documentation</Button>
                            </Fragment>
                        )
                    )}
                    
                </Toolbar>
            </AppBar>
        )
    }
}


Nav.propTypes = {
    authenticatedUser: PropTypes.bool.isRequired,
    authenticatedAdmin: PropTypes.bool.isRequired,
    // adminFullname: PropTypes.string.isRequired,
    logoutAdmin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    authenticatedUser: state.user.authenticated,
    authenticatedAdmin: state.admin.authenticated,
    // adminFullname: state.admin.fullname
})

export default connect(mapStateToProps, {logoutAdmin})(Nav);