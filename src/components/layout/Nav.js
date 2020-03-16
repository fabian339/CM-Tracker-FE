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
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
      },
    menuItem: {
        fontSize: "13px",
        fontWeight: "600",
        color: "dimgray"
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

    handleHoverItem = event => {
        this.setState({hover : true})
    }

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    handleLogOut = () => {
        console.log("logout called")
        this.props.logoutAdmin();
    }


    render() {
        const { 
            authenticatedUser, 
            authenticatedAdmin,
        } = this.props;
        console.log("NAvv", this.props);
        const styledListItem = this.state.hover ? {backgroundColor: "black"} : "none";
console.log("docc", document)
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
                                {/* <Tooltip title={localStorage.fullname.replace(/_/g, " ").toUpperCase()} aria-label="add">
                                </ Tooltip> */}

                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    // variant="contained"
                                    // color="primary"
                                    // onClick={handleClick}
                                    // aria-owns={this.state.open ? 'simple-menu' : null}
                                    // aria-haspopup="true"
                                    style={styles.navButtons}
                                    onClick={this.handleClick}
                                    onMouseOver={this.handleClick}
                                    >
                                    <PersonIcon /> 
                                </Button>
                                <Menu
                                    elevation={0}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.open}
                                    onClose={this.handleRequestClose}
                                    >
                                    <div style={{backgroundColor: "mediumturquoise"}}>
                                        <MenuItem style={styles.menuItem} onClick={this.handleRequestClose}>{localStorage.fullname.replace(/_/g, " ").toUpperCase()}</MenuItem>
                                        <MenuItem style={styles.menuItem} onClick={this.handleRequestClose}>USERS</MenuItem>
                                        <MenuItem style={styles.menuItem} onClick={this.handleRequestClose}>CLIENTS</MenuItem>
                                        <MenuItem style={styles.menuItem} onClick={this.handleRequestClose}>ORGANIZATION</MenuItem>
                                    </div>
                                </Menu>
                                {/* <div className="image-wrapper">
                                    <img src={imageUrl} alt="profile" className="profile-image"/>
                                    <input 
                                    type="file" 
                                    id="imageInput" 
                                    onChange={this.handleImageChange} 
                                    hidden="hidden"
                                    />
                                </div> */}

                                <Button style={styles.navButtons} color="inherit" component={Link} to={`/admin/${localStorage.fullname}/modules`} > MODULES </Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/" > ACTIVITIES </Button>
                                <Button style={styles.navButtons} color="inherit" component={Link} to="/documentation" > resources </Button>

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
    admin: PropTypes.object.isRequired,
    logoutAdmin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    authenticatedUser: state.user.authenticated,
    authenticatedAdmin: state.admin.authenticated,
    admin: state.admin
})

export default connect(mapStateToProps, {logoutAdmin})(Nav);