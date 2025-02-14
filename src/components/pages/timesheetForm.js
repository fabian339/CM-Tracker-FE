import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
// import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';
import { Flash } from 'react-motions' //https://github.com/raphamorim/react-motions

//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyAutocomplete from '../../util/MyAutocomplete'

import paticipantList from './participantList';

//redux stuff
//Redux stuf
import { connect } from 'react-redux';
import { checkInOut } from '../../redux/actions/userActions'
import participantList from './participantList';

// const Link = require("react-router-dom").Link


class timesheetForm extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            actType: '',
            numberofCalls: 0,
            message: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        //   console.log("it received props", nextProps)
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }
  

    handleSubmit = (event) => {

        event.preventDefault();
        //check if the input exist on the
        let found = paticipantList.find(name => name === this.state.name);

        if (found == null) {
            const errors = {};
            errors.name = "Please select your name from the list.";
            this.setState({errors});
            return ;
        }

        const newActivity = {
            name: this.state.name,
            actType: this.state.actType,
            numberofCalls: parseInt(this.state.numberofCalls)
        }

        this.props.checkInOut(newActivity, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleActivityType = (event, value) => {
    
        this.setState({actType: value})
    }

    handleSelectName = (event, value) => {
    
        this.setState({name: value})
    }



    render() {
        const {errors} = this.state;
        const { data : { loading, message }  } = this.props;

        // console.log(this.state.name);
        return (
        <Flash>     
            <Grid container>
                <Grid item sm />
                    <Grid item sm={8}>
                        <Typography variant="h4" style={styles.pageTitle} >
                            NDA INTERNS TIMESHEET
                        </Typography>

                        <form noValidate onSubmit={this.handleSubmit} style={styles.form}>
                            
            
                            <MyAutocomplete
                                options={participantList}
                                onInputChange={this.handleSelectName}
                                name='name'
                                label="Select participant name."
                                style={{width: "40%", margin: "20px 30%"}}
                                helperText={errors.name}
                                error={errors.name ? true : false}
                                value={this.state.name}
                            >
                            </MyAutocomplete>
  
                            <MyAutocomplete
                                options={["Clock-in", "Clock-out"]}
                                onInputChange={this.handleActivityType}
                                name='actType'
                                label="Select to clock-in or clock-out?"
                                style={{width: "40%", margin: "20px 30%"}}
                                helperText={errors.actType}
                                error={errors.actType ? true : false}
                                value={this.state.actType}
                            >
                            </MyAutocomplete>

                            {(this.state.actType === "Clock-out") && (
                                <TextField
                                required={true}
                                id='numberofCalls'
                                name='numberofCalls'
                                type="numberofCalls"
                                onChange={this.handleChange}
                                variant="outlined"
                                type="number"
                                label="Enter number of calls:"
                                style={{width: "40%", margin: "20px 30%"}}
                                value={this.state.numberofCalls}

                                />
                            )}

                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{width: "40%", margin: "20px 30%"}}
                            disabled={false}
                            > Submit
                            {loading && (
                                <CircularProgress size={30} style={styles.progress} />
                            )}
                            </Button>
                            <br/>
                            {errors.message && (
                                <Typography variant="h6" style={{textAlign: "center", color: "red"}}>{errors.message}</Typography>
                            )}

                            <Typography variant="h6" style={{textAlign: "center", color: "blue"}}>{message.message}</Typography>

                        </form>
                    </Grid>
                <Grid item sm/>
            </Grid>
        </Flash>
        )
    }
}

timesheetForm.propTypes = {
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    checkInOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

export default connect(mapStateToProps, {checkInOut})(timesheetForm);

