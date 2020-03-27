import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import UNAUTHORIZEDPAGE from '../../public/UNAUTHORIZEDPAGE';
import {Redirect} from 'react-router-dom';
import Modules from './Modules'
import Grid from '@material-ui/core/Grid'
import Profile from '../../../../components/profile/Profile'

// import axios from 'axios';
// import Typography from '@material-ui/core/Typography';

// MUI stuff
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
// import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

//icons 
// import LocationOn from '@material-ui/icons/LocationOn'
// import AddIcon from '@material-ui/icons/Add'
// import HomeIcon from '@material-ui/icons/Home'
// import Notifications from '@material-ui/icons/Notifications'

import { getAdminData } from '../../../../redux/actions/userActions';


// const Link = require("react-router-dom").Link



export class adminModule extends Component {
    constructor(){
        super();
        this.state = {
            errors: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getAdminData(params.fullname);
        console.log("Modules component",this.props)

      }

      
      UNSAFE_componentWillReceiveProps(nextProps){
        //   console.log("it received props", nextProps)
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    render() {
        // console.log("moduless state", this.state);
        // console.log("Modules component",this.props)
        const {errors} = this.state

        return (
            <Grid>
                {errors ? (
                    <p style={{fontSize:"100px"}}>{errors.error}</p>
                ) : (
                <Grid container>
                    <Grid item sm={8} xs={12}>
                        <Modules />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
                )}
            </Grid>


                // {errors.error && (
                //     <p style={{fontSize:"100px"}}>{errors.error}</p>
                // )}
        )
        
    }
}

adminModule.propTypes = {
    getAdminData: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});



export default connect(mapStateToProps, {getAdminData})(adminModule);
// export default (adminModule);