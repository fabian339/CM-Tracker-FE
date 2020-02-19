import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import styles from './styles';
import Typography from '@material-ui/core/Typography';
// import noImg from '../../../../images/no-pic.png';
import { Bounce, Shake, FadeIn } from 'react-motions' //https://github.com/raphamorim/react-motions
import appLogo from '../../../images/ori_logo.png';

//mui studd
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';// import { connect } from 'react-redux';
// import { signupUser } from '../redux/actions/userActions'

const Link = require("react-router-dom").Link


class registration extends Component {

    state = {
        adminHover: false,
        userHover: false,
        clientHover: false,
    }
    
    toggleAdminHover = () =>  { this.setState({adminHover: true}); }
    toggleAdminLeave = () =>  { this.setState({adminHover: false}); }

    toggleUserHover = () =>  { this.setState({userHover: true}); }
    toggleUserLeave = () =>  { this.setState({userHover: false}); }

    toggleClientHover = () =>  { this.setState({clientHover: true}); }
    toggleClientLeave = () =>  { this.setState({clientHover: false}); }

    render() {
        const  {adminHover, userHover, clientHover } = this.state;

        return (
            <FadeIn duration={4}>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={styles.logoContainer}>
                            <img src={appLogo} alt="icon" style={{width: 250}}/>
                        </div>

                        <Typography variant="h4" style={styles.pageTitle} >
                            CHOOSE THE ACCOUNT THAT FIT YOUR INTEREST
                        </Typography>

                        <Grid container justify="center" style={styles.container} >
                            <Grid item>
                                <Grid item>
                                    <PersonOutlineIcon style={styles.personIcon} />
                                </Grid>
                                <Grid item>
                                    <Button 
                                    style={!adminHover ? styles.adminBtn: styles.onBtnHover } 
                                    onMouseEnter={this.toggleAdminHover} 
                                    onMouseLeave={this.toggleAdminLeave}
                                    variant="contained" 
                                    component={Link} to="/admin-register" >
                                        Admin-Registration
                                    </Button>
                                    <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                        Register as an administrator of an organization. This account contains elevated
                                        privileges for monitoring, managing, and modifying the system and its participants at any
                                        level.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item>
                                    <PersonOutlineIcon style={styles.personIcon} />
                                </Grid>
                                <Grid item>
                                    <Button 
                                    style={!userHover ? styles.userBtn: styles.onBtnHover } 
                                    onMouseEnter={this.toggleUserHover} 
                                    onMouseLeave={this.toggleUserLeave}
                                    variant="contained" 
                                    component={Link} 
                                    to="/user-register" >
                                        User-Registration
                                    </Button>
                                    <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                        Register as a user of an organization. This account is managed by the user and its 
                                        administrators. Users can access the clock-in-out system, view additional information,
                                        and new resources.
                                    </Typography>                        
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item>
                                    <PersonOutlineIcon style={styles.personIcon} />
                                </Grid>
                                <Grid item>
                                    <Button 
                                    style={!clientHover ? styles.clientBtn: styles.onBtnHover } 
                                    onMouseEnter={this.toggleClientHover} 
                                    onMouseLeave={this.toggleClientLeave}                                    variant="contained" 
                                    component={Link} 
                                    to="/client-register" >
                                        Client-Registration
                                    </Button>
                                    <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                        Register as a client of an organization. This account is managed by the 
                                        administrators. Clients can only access the clock-in-out system.
                                    </Typography>                        
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FadeIn>
        )
    }
}


export default registration;
