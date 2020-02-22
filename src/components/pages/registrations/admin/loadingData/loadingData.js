import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AppIcon from '../images/ori_logo.png';
import Typography from '@material-ui/core/Typography';
import appLogo from '../../../../../images/ori_logo.png';
import styles from '../styles';
import { Bounce, Shake, FadeIn, FadeOut, Flash } from 'react-motions' //https://github.com/raphamorim/react-motions


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

//Redux stuf
import { connect } from 'react-redux';
import { mergeAdminWithOrg } from '../../../../../redux/actions/adminActions'

const Link = require("react-router-dom").Link


class loadingData extends Component {

   
    render() {
        return (
            <p>Loading</p>
        )
    }

}

loadingData.propTypes = {
    admin: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    mergeAdminWithOrg: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    UI: state.UI
});

export default connect(mapStateToProps, { mergeAdminWithOrg })(loadingData);
