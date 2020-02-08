import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux stuff
//Redux stuf
// import { connect } from 'react-redux';
// import { signupUser } from '../redux/actions/userActions'

const Link = require("react-router-dom").Link


const styles = (theme) => ({
    ...theme.spreadIt
});

class register extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(nextProps.UI.errors) {
    //         this.setState({ errors: nextProps.UI.errors })
    //     }
    // }

    handleSubmit = (event) => {

    //     event.preventDefault();

    //     this.setState({
    //         loading: true
    //     });

    //     const newUserData = {
    //         email: this.state.email,
    //         password: this.state.password,
    //         confirmPassword: this.state.confirmPassword,
    //         handle: this.state.handle
    //     }

    //    this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        // const { classes, UI: { loading } } = this.props;
        // const errors = this.state.errors.errors ? this.state.errors.errors : this.state.errors;
        // console.log(errors);
        return (
            <Grid container >
                <Grid item sm />
                <Grid item sm>
                    {/* <img src={AppIcon} alt="icon" className={classes.image}/> */}
                    <Typography variant="h3"  >
                        register
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField
                        id='email'
                        name='email'
                        type="email"
                        label="Email"
                        // className={classes.textField}
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        id='password'
                        name='password'
                        type="password"
                        label="Password"
                        // className={classes.textField}
                        // helperText={errors.password}
                        // error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        type="password"
                        label="Confirm Password"
                        // className={classes.textField}
                        // helperText={errors.confirmPassword}
                        // error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        id='handle'
                        name='handle'
                        type="text"
                        label="Handle/UserName"
                        // className={classes.textField}
                        // helperText={errors.handle}
                        // error={errors.handle ? true : false}
                        value={this.state.handle}
                        onChange={this.handleChange}
                        fullWidth />

                        {/* {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )} */}

                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        disabled={false}
                        > register
                        {/* {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )} */}
                        </Button>
                        <br/>
                        <small>
                            Already have an account? Log In <Link to="/login">Here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>

        )
    }
}


export default (register);
