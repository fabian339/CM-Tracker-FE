import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import UNAUTHORIZEDPAGE from '../../public/UNAUTHORIZEDPAGE';
import {Redirect} from 'react-router-dom';
import Modules from './Modules'

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

import { getAdminData } from '../../../../redux/actions/adminActions';


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
      }

      
      UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    render() {
        console.log("moduless state", this.state);
        console.log("Modules component",this.props)
        const {errors} = this.state

        return (
            <div>
                {errors.error && (
                    <p style={{fontSize:"100px"}}>{errors.error}</p>
                )}
                <Modules />
            </div>
        )
        
    }
}

adminModule.propTypes = {
    admin: PropTypes.object.isRequired,
    getAdminData: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    UI: state.UI
});



export default connect(mapStateToProps, {getAdminData})(adminModule);
// export default (adminModule);