import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import "../../App.css"
import Typography from '@material-ui/core/Typography';
// import appLogo from '../../../../images/ori_logo.png';
import styles from './styles';
import { Flash } from 'react-motions' //https://github.com/raphamorim/react-motions
import SignaturePad from "react-signature-canvas"
//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyAutocomplete from '../../util/MyAutocomplete'
import Checkbox from '@material-ui/core/Checkbox';

import paticipantList from './participantList';

//redux stuff
//Redux stuf
import { connect } from 'react-redux';
import { submitSignature } from '../../redux/actions/userActions'
import participantList from './participantList';

// const Link = require("react-router-dom").Link


class timesheetForm extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            checked: false,
            clear: false,
            message: '',
            errors: {}
        }
    }
    // sigCanvas = {};


    UNSAFE_componentWillReceiveProps(nextProps){
        //   console.log("it received props")
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }
  

    handleSubmit = (event) => {

        event.preventDefault();
        //check if the input exist on the
        let found = paticipantList.find(name => name === this.state.name);
        const errors = {};
        if (found == null) {
            errors.name = "Please select your name from the list.";
            this.setState({errors});
            return ;
        }
        
        if(this.sigCanvas == undefined || this.sigCanvas.isEmpty() ){
            // console.log("hello")
            errors.signature = "Please Agree to terms and Provide Signature!";
            this.setState({errors});
            return ; 
        }

        const signature = {
            name: this.state.name,
            checked: this.state.checked,
            signature: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png')
        }

        this.props.submitSignature(signature, this.props.history);
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

    handleConditionChecked = (event, value) => {
    
        this.setState({checked: value})
    }

    clearCanvas = () => {
        this.sigCanvas.clear()
    }

    render() {
        const {errors} = this.state;
        const { data : { loading, message }  } = this.props;

        // console.log(this.state.sigCanvas);
        return (
        <Flash>     
            <Grid container>
                <Grid item sm />
                    <Grid item sm={8}>
                        <Typography variant="h4" style={styles.pageTitle} >
                            NDA INTERNS TIMESHEET SIGNATURES
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

                            {errors.signature && (
                                <Typography variant="body1" style={{textAlign: "center", color: "red"}}>{errors.signature}</Typography>
                            )}

                            {this.state.name === paticipantList.find(name => name === this.state.name) && (
                                <Typography style={{textAlign: "center"}}>
                                    <Checkbox
                                        checked={this.state.checked}
                                        onChange={this.handleConditionChecked}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                        By signing, I certify that all the information is correct as it represents my attendance and work at the worksite.
                                    </Typography>
                                )
                            }

                            {this.state.checked && (
                                <div style={{textAlign: "center", margin: "10px"}}>
                                    <Typography variant="h4" >Please Sign: </Typography>
                                    <SignaturePad 
                                        ref={(ref) => { this.sigCanvas = ref }} />
                                        {/* canvasProps={{
                                        className: "signatureCanvas"
                                    }}  */}
                                
                                    <Button variant="contained" onClick={this.clearCanvas} >Clear</Button>
                                </div>
                                                                                    
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
    submitSignature: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

export default connect(mapStateToProps, {submitSignature})(timesheetForm);

