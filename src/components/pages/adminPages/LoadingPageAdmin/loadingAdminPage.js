import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
// import appLogo from '../../../../../images/ori_logo.png';
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
import { mergeAdminWithOrg } from '../../../../redux/actions/adminActions'

const Link = require("react-router-dom").Link

const styles = {
    container: {
        textAlign: 'center',
        width: "80%",
        height: '400px',
        margin: "10% 10%",
        position: "relative"
    },
    circleProgress: {
        width: "400px",
        height: "400px",
        borderRadius: "15px",
    },
    showPercent: {
        fontSize: "90px",
        color: "darkslategray",
        position: "absolute",
        left: "45%",
        marginLeft: "-50px",
        top: "45%",
        marginTop: "-50px"
    },
    message: {
        textAlign: "center",
        fontSize: "60px",
        marginTop: "15px",
        color: "dimgray",
        fontFamily: "'Nosifer', cursive"
    }
}


class loadingAdminPage extends Component {

        constructor(){
            super();
            this.state = {
                percentage: 0,
                timer: 1,
                intervalId: 0
            }
        }
        // const [completed, setCompleted] = React.useState(0);
        componentDidMount = () => {
            document.body.style = "background: radial-gradient(black, white);";

            let intervalId  = setInterval(this.runTimer, 1000);
            this.setState({intervalId: intervalId});
          }



        addProgress  = () => {
               console.log("Adding");
            this.setState({ percentage: this.state.percentage + 12.5, timer: this.state.timer + 1})
          }

        reset = () => {
            document.body.style = 'background: #ffff;';
            clearInterval(this.state.intervalId);
            const { firstN , lastN } = this.props.admin.information;

            this.props.history.push(`/admin/${firstN+"_"+lastN}/modules`)
        }

        runTimer = () => {
            if (this.state.timer <= 8) { 
                this.addProgress()
            } else {
                this.reset()
            }
        }

        render() {
          
            console.log(this.state.percentage, this.state.timer, this.props);
            
            return (
                <div style={styles.container}>
                
                    <Typography style={styles.showPercent}>
                        {this.state.percentage}%
                    </Typography>
                    <CircularProgress style={styles.circleProgress} variant="static" value={this.state.percentage} />
                    {(this.state.timer < 5 ) ? (
                        <Bounce duration={3}>
                            <Typography style={styles.message}> LOADING DATA </Typography>
                        </Bounce>
                    ): ((this.state.timer >= 5 && this.state.timer < 8 ) ? (
                        <FadeOut duration={5}>
                            <Typography style={styles.message}> ALMOST DONE </Typography>
                        </FadeOut>

                    ) : (
                        <Shake duration={2}>
                            <Typography style={styles.message}> ALL SET </Typography>
                        </Shake>
                    ))}

                    {/* <LinearProgress style={styles.progressBar2} variant="determinate" value={this.state.percentage} color="secondary"/> */}

                </div>
                
            )
        }
}
const mapStateToProps = (state) => ({
    admin: state.admin,
});

export default connect(mapStateToProps)(loadingAdminPage);

