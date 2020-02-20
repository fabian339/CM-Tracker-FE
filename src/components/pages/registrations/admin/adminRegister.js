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
import PanToolIcon from '@material-ui/icons/PanTool';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';





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
            addrees: '',
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

        // const { styles, UI: { loading } } = this.props;
        // const errors = this.state.errors.errors ? this.state.errors.errors : this.state.errors;
        // console.log(errors);
        return (
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
                        // style={{margin: "auto 10px auto auto"}}
                        style={{width: "37.5%", marginRight: "2.5%"}}
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
                        style={{width: "37.5%", marginLeft: "2.5%"}}
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
                        style={{width: "37.5%", marginRight: "2.5%"}}
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
                        style={{width: "37.5%", marginLeft: "2.5%"}}
                        // helperText={errors.handle}
                        // error={errors.handle ? true : false}
                        value={this.state.phone}
                        onChange={this.handlePhoneChange}
                         />

                        <Typography variant="h6" style={{margin: "20px auto 10px auto"}}>
                            ORGANIZATION
                        </Typography>

                        <div>
                            <Typography variant="subtitle1">
                                Is your organization register with us?
                            </Typography>
                            {/* <FormControlLabel label="No" /> */}
                            <div >
                                <Grid 
                                component="label" 
                                container 
                                alignItems="center"
                                style={{margin: "auto 40%"}}
                                >
                                    <Grid item>No</Grid>
                                        <Grid item>
                                            <Switch
                                                name="orgExist"
                                                checked={this.state.orgExist}
                                                onChange={this.handleChange}
                                                value={this.state.orgExist}
                                                color="primary"
                                            />
                                        </Grid>
                                    <Grid item>Yes</Grid>
                                </Grid>
                            </div>
                        </div>

                        {this.state.orgExist ? (
                            <Typography variant="body2">
                               An email has been sent to other admins, please verify
                            </Typography>
                        ) : (
                            <Grid >
                                <Typography variant="subtitle1">
                                    Lest register your organization
                                </Typography>
                                <TextField
                                    id='organization'
                                    name='organization'
                                    type="text"
                                    label="Organization/Business Name"
                                    style={styles.textField}
                                    variant="outlined" 
                                    required
                                    // helperText={errors.email}
                                    // error={errors.email ? true : false}
                                    value={this.state.organization}
                                    onChange={this.handleChange}
                                    fullWidth 
                                    /> 

                                <TextField
                                    id='addrees'
                                    name='addrees'
                                    type="text"
                                    label="Address: 123 Street Ave, New York, NY, 10022"
                                    style={styles.textField}
                                    required
                                    // helperText={errors.email}
                                    // error={errors.email ? true : false}
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    fullWidth 
                                    /> 
                                
                                <MuiPhoneNumber
                                name="orgPhone"
                                label="Main Phone Number"
                                data-cy="user-phone"
                                defaultCountry={"us"}
                                style={{width: "37.5%", marginLeft: "2.5%"}}
                                // helperText={errors.handle}
                                // error={errors.handle ? true : false}
                                value={this.state.phone}
                                onChange={this.handlePhoneChange}
                                />

                            <FormControl>
                                <InputLabel htmlFor="age-native-simple">Organization Type</InputLabel>
                                <Select
                                native
                                value={this.state.orgType}
                                style={{width: "37.5%"}}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'orgType',
                                    id: 'age-native-simple',
                                }}
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>


                            </Grid>
                            )
                        }

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
