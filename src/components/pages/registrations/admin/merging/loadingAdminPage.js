import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../../images/ori_logo.png';
// import styles from '../styles';
import { Bounce, Shake, FadeIn, FadeOut, Flash } from 'react-motions' //https://github.com/raphamorim/react-motions


//mui studd
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuf
import { connect } from 'react-redux';
import { mergeAdminWithOrg } from '../../../../../redux/actions/adminActions'

const Link = require("react-router-dom").Link

const styles = {
    container: {
        // backgroundColor: "black",
        // width: '320px',
        height: '320px',
        margin: "5% 40%"
    },
    ladderLoading: {
        // width: "",
        // height: "500px"
    }
}


class loadingAdminPage extends Component {
        // const p =    setInterval(() => <p style={{fontSize:"100px"}}>Loading</p>, 1000);
        // const classes = useStyles();
        constructor(){
            super();
            this.state = {
                percentage: 0,
                start: true,
                timer: 1,
                intervalId: 0
            }
        }
        // const [completed, setCompleted] = React.useState(0);
        componentDidMount = () => {
            let intervalId  = setInterval(this.runTimer, 2000);
            this.setState({intervalId: intervalId});
          }



        addProgress  = () => {
               console.log("Adding")
            this.setState({ percentage: this.state.percentage + 12.5, timer: this.state.timer + 1})
          }
          
        resetPercentage = () => {
            console.log("Stoping")
            clearInterval(this.state.intervalId);
            this.setState({percentage: 100, start: false})
        }

        runTimer = () => {
            if (this.state.timer <= 8) { 
                this.addProgress()
            } else {
                this.resetPercentage()
            }
        }

        render() {
          
            console.log(this.state.percentage, this.state.timer);
            
            return (
                <div style={styles.container}>
                    <LinearProgress variant="determinate" value={this.state.percentage} />
                    <LinearProgress variant="determinate" value={this.state.percentage} color="secondary" />
                        {/* <CircularProgress variant="static" value={this.state.percentage} /> */}

                </div>
                
            )
        }
    
}


export default loadingAdminPage
