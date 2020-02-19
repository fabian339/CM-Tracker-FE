import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import noImg from '../../../images/no-pic.png';
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


const styles = {
    pageTitle: {
        // margin: '-30px auto 10px auto'
        marginTop: "10px",
        textAlign: "center"
    },
    container: {
        marginTop: "-10px",
    },
    personIcon: {
        height: "100%",
        width: "100%",
        color: "lightseagreen"
    },
    adminBtn: {
        width: "200px",
        bottom: "45px",
        marginLeft: "50px",
        color: "white",
        backgroundColor: "darkblue",
        borderRadius: "20px"
    },
    userBtn: {
        width: "200px",
        bottom: "45px",
        marginLeft: "50px",
        color: "white",
        backgroundColor: "darkmagenta",
        borderRadius: "20px"
    },
    clientBtn: {
        width: "200px",
        bottom: "45px",
        marginLeft: "50px",
        color: "white",
        backgroundColor: "darkgoldenrod",
        borderRadius: "20px"
    },
    btnDetails: {
        width: "200px",
        marginLeft: "50px",
        marginTop: "-30px"
    },
    logo: {
        marginTop: '85px',
        marginLeft: '41%',
        marginRight: '41%',
        width: 300,
    }

}

class registration extends Component {


    render() {
        return (
            <FadeIn duration={4}>

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <img src={appLogo} alt="icon" style={styles.logo}/>

                <Typography variant="h4" style={styles.pageTitle} >
                    CHOOSE THE ACCOUNT THAT FIT YOUR INTEREST
                </Typography>
                <Grid container justify="center" spacing={2} style={styles.container} >
                    <Grid item>
                        <Grid item>
                            <PersonOutlineIcon style={styles.personIcon} />
                        </Grid>
                        <Grid item>
                            <Button style={styles.adminBtn} variant="contained" component={Link} to="/admin-register" >
                                Admin-Registration
                            </Button>
                            <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <PersonOutlineIcon style={styles.personIcon} />
                        </Grid>
                        <Grid item>
                            <Button style={styles.userBtn} variant="contained" component={Link} to="/admin-register" >
                                User-Registration
                            </Button>
                            <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <PersonOutlineIcon style={styles.personIcon} />
                        </Grid>
                        <Grid item>
                            <Button style={styles.clientBtn} variant="contained" component={Link} to="/admin-register" >
                                Client-Registration
                            </Button>
                            <Typography style={styles.btnDetails} variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </FadeIn>

        )
    }
}


export default registration;
