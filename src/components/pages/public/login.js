import React, { Component } from 'react';
// import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import appLogo from '../../../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import styles from './styles';


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

//Redux stuf
import { connect } from 'react-redux';
import { loginFunc } from '../../../redux/actions/userActions'



// const Link = require("react-router-dom").Link


class login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginFunc(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { UI: { loading } } = this.props;
        let { errors } = this.state;

        return (
            <Grid>
                <header>
                    <div style={styles.logoContainer}>
                        <img src={appLogo} alt="icon" style={{width: 250}}/>
                    </div>                    
                    <Typography variant="h4" style={styles.pageTitle} >
                        Log In
                    </Typography>
                </header>
                <Grid container >
                <Grid item sm />
                <Grid item sm>
                    <form noValidate onSubmit={this.handleSubmit} style={styles.form} >
                        <TextField
                        required
                        id='email'
                        name='email'
                        type="email"
                        label="Email"
                        style={styles.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth />

                        <TextField
                        required
                        id='password'
                        name='password'
                        type="password"
                        label="Password"
                        style={styles.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth />
                        
                        {errors.general && (
                            <Typography variant="body2" style={styles.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        {/* <footer style={{margin: "20px auto", color: "gray"}}>
                            <small>
                                Forgot your password? Not a problem, Recover <Link to="/account-recover">Here</Link>
                            </small>
                        </footer> */}
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        // disabled={false}
                        > Login
                        {loading && (
                            <CircularProgress size={30} style={styles.progress} />
                        )}
                        </Button>
                        {/* <br/>
                        <footer style={{margin: "20px auto"}}>
                            <small>
                                Do not have an account? Register Now <Link to="/registration">Here</Link>
                            </small>
                        </footer> */}
                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
            </Grid>
        )
    }
}


login.propTypes = {
    loginFunc: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});


export default connect(mapStateToProps, { loginFunc })(login);
