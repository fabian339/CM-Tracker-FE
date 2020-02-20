import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiPhoneNumber from "material-ui-phone-number";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


//redux stuff
//Redux stuf
import { connect } from 'react-redux';
import { adminRegistration } from '../../../../redux/actions/adminActions'

const Link = require("react-router-dom").Link


class adminRegister extends Component {

    constructor(){
        super();
        this.state = {
            firstN: '',
            lastN: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
            phone: '',
            organization: '',
            orgExist: false,
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();

        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

    //    this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePhoneChange = (value) => {
        if (value) {
          this.setState({ phone: value });
        }
      }

    render() {

        // const { styles, UI: { loading } } = this.props;
        // const errors = this.state.errors.errors ? this.state.errors.errors : this.state.errors;
        // console.log(errors);
        return (
            <Grid container style={styles.form}>
                <Grid item sm />
                <Grid item sm>
                    <div style={styles.logoContainer}>
                        <img src={appLogo} alt="icon" style={{width: 250}}/>
                    </div>                    
                    <Typography variant="h4" style={styles.pageTitle} >
                        Control it all, Become an Admin
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        id='First'
                        name='firstN'
                        type="firstN"
                        label="First Name"
                        style={{margin: "auto 20px"}}
                        required
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.firstN}
                        onChange={this.handleChange}
                         />

                        <TextField
                        id='Last'
                        name='lastN'
                        type="lastN"
                        label="Last Name"
                        style={{margin: "auto 20px"}}
                        required
                        // variant="outlined"
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.lastN}
                        onChange={this.handleChange}
                         />
                         


                        <TextField
                        id='email'
                        name='email'
                        type="email"
                        label="Email"
                        style={styles.textField}
                        required
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
                        required
                        style={styles.textField}
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
                        required
                        style={styles.textField}
                        // helperText={errors.confirmPassword}
                        // error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        id="date"
                        name="dob"
                        label="Birthday"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        style={{margin: "10px 20px"}}
                        // helperText={errors.handle}
                        // error={errors.handle ? true : false}
                        value={this.state.dob}
                        onChange={this.handleChange}
                         />

                        <MuiPhoneNumber
                        name="phone"
                        label="Phone Number"
                        data-cy="user-phone"
                        defaultCountry={"us"}
                        style={{margin: "10px 20px"}}
                        // helperText={errors.handle}
                        // error={errors.handle ? true : false}
                        value={this.state.phone}
                        onChange={this.handlePhoneChange}
                         />

                        <Typography variant="h6" style={{marginTop: "10px"}}>
                            ORGANIZATION
                        </Typography>

                        <TextField
                        id='organization'
                        name='organization'
                        type="text"
                        label="Organization Name"
                        style={styles.textField}
                        variant="outlined" 
                        required
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.organization}
                        onChange={this.handleChange}
                        fullWidth />

                        <div style={{display: 'inline-flex'}}>
                            <Typography variant="subtitle1" style={{margin: "20px 20px"}}>
                                Is this organization already register with us?
                            </Typography>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.orgExist}
                                    onChange={this.handleChange}
                                    name="orgExist"
                                    style={{margin: "10px 20px"}}
                                    >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {this.state.orgExist ? (
                            <Typography variant="body2">
                               An email has been sent to other admins, please verify
                            </Typography>
                        ) : (
                            <Typography variant="body2">
                                Will you like to register this organization?
                            </Typography>
                        )}

                        {/* {errors.general && (
                            <Typography variant="body2" style={styles.customError}>
                                {errors.general}
                            </Typography>
                        )} */}

                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={false}
                        > register
                        {/* {loading && (
                            <CircularProgress size={30} style={styles.progress} />
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

adminRegister.propTypes = {
    admin: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    adminRegistration: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    UI: state.UI
});

export default connect(mapStateToProps, { adminRegistration })(adminRegister);
