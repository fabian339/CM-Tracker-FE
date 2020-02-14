import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import noImg from '../../../images/no-pic.png';

//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';// import { connect } from 'react-redux';
// import { signupUser } from '../redux/actions/userActions'

const Link = require("react-router-dom").Link


const styles = {
    pageTitle: {
        // margin: '-30px auto 10px auto'
        marginTop: "110px",
        textAlign: "center"
    },
    container: {
        marginTop: "20px"
    },
    personIcon: {
        height: "90%",
        width: "90%"
        // borderRadius: "70px",
        // border: "2px solid bisque"
    }

}

class registration extends Component {

    render() {
        return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" style={styles.pageTitle} >
                    CHOOSE THE ACCOUNT THAT FIT YOUR INTEREST
                </Typography>
                <Grid container justify="center" spacing={2} style={styles.container} >
                    <Grid item>
                        {/* <Button color="inherit" component={Link} to="/admin-register" >
                            <img src={noImg} alt="picture" />
                        </Button> */}
                        <PersonOutlineIcon style={styles.personIcon} />
                        <Button color="inherit" component={Link} to="/admin-register" >
                            Admin-Registration
                        </Button>
                        <p>lkgljhg</p>

                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/admin-register" >
                            <img src={noImg} alt="picture" />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/admin-register" >
                            <img src={noImg} alt="picture" />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        )
    }
}


export default registration;
