import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';
import { Bounce, Shake, FadeIn, FadeOut, Flash } from 'react-motions' //https://github.com/raphamorim/react-motions
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiPhoneNumber from "material-ui-phone-number";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PanToolIcon from '@material-ui/icons/PanTool';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';


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
            //errors
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

        const newAdminData = {
            firstN: this.state.firstN,
            lastN: this.state.lastN,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            dob: this.state.dob,
            phone: this.state.phone
        }

        let fullname = newAdminData.firstN+"_"+newAdminData.lastN;

        const newPath = `/admin/${fullname}/org-register`;

        //call to add the new admin and redirect to new path
       this.props.adminRegistration(newAdminData, this.props.history, newPath);
    }

    handleChange = (event) => {
        // console.log(event.target.name)
        if (event.target.name === "orgExist"){
            this.setState({
                [event.target.name]: !this.state.orgExist
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }


    handlePhoneChange = (value) => {
        if (value) {
          this.setState({ phone: value });
        }
      }

    render() {

        const {  UI: { loading } } = this.props;
        const { errors } = this.state;
        // console.log(this.props);

        // const errors = this.state.errors.errors ? this.state.errors.errors : this.state.errors;
        return (
        <Flash>
            <Grid >
            <header>
                <div style={styles.logoContainer}>
                    <img src={appLogo} alt="icon" style={{width: 250}}/>
                </div>                    
                <Typography variant="h4" style={styles.pageTitle} >
                    Flexibility at your 
                    <PanToolIcon style={{ color: "lightsteelblue"}}/>
                    hands
                    <PanToolIcon style={{ color: "lightsteelblue"}}/>
                    when becoming an Admin
                </Typography>
            </header>
            <Grid container>
                <Grid item sm />
                <Grid item sm>
                    <form noValidate onSubmit={this.handleSubmit} style={styles.form}>
                        
                        <TextField
                        id='First'
                        name='firstN'
                        type="firstN"
                        label="First Name"
                        style={{width: "37.5%", marginRight: "2.5%"}}
                        required
                        helperText={errors.firstN}
                        error={errors.firstN ? true : false}
                        value={this.state.firstN}
                        onChange={this.handleChange}
                        />

                        <TextField
                        id='Last'
                        name='lastN'
                        type="lastN"
                        label="Last Name"
                        style={{width: "37.5%", marginLeft: "2.5%"}}
                        required
                        // variant="outlined"
                        helperText={errors.lastN}
                        error={errors.lastN ? true : false}
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
                        helperText={errors.email}
                        error={errors.email ? true : false}
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
                        helperText={errors.password}
                        error={errors.password ? true : false}
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
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        id="date"
                        name="dob"
                        label="Birthday"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        style={{width: "37.5%", marginRight: "2.5%"}}
                        helperText={errors.dob}
                        error={errors.dob ? true : false}
                        value={this.state.dob}
                        onChange={this.handleChange}
                         />

                        <MuiPhoneNumber
                        name="phone"
                        label="Active Phone#"
                        data-cy="user-phone"
                        defaultCountry={"us"}
                        style={{width: "37.5%", marginLeft: "2.5%"}}
                        helperText={errors.phone}
                        error={errors.phone ? true : false}
                        value={this.state.phone}
                        onChange={this.handlePhoneChange}
                         />

                        {errors.general && (
                            <Typography variant="body2" style={styles.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={false}
                        > register
                        {loading && (
                            <CircularProgress size={30} style={styles.progress} />
                        )}
                        </Button>
                        <br/>
                        <footer style={{margin: "20px auto"}}>
                            <small>
                                Already have an account? Log In <Link to="/login">Here</Link>
                            </small>
                        </footer>
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        </Grid>
        </Flash>
        )
    }
}

adminRegister.propTypes = {
    // admin: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    adminRegistration: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    // admin: state.admin,
    UI: state.UI
});

export default connect(mapStateToProps, { adminRegistration })(adminRegister);
