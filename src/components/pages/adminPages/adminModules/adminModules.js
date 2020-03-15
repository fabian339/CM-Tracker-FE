import React, { Component, Fragment } from 'react'
// import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

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



// const Link = require("react-router-dom").Link



export default class adminModule extends Component {

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     if(nextProps.UI.errors) {
    //         // console.log("PROPSs", nextProps)
    //         // nextProps.history.push("/UNAUTHORIZED")
    //         // this.setState({ errors: nextProps.UI.errors })
    //     }
    // }

    componentDidMount(){
        console.log("moduless", this.props);

        // console.log("DATAAAA PROPSSS", this.props);
        // const handle = this.props.match.params.handle;
        // const secretId = this.props.match.params.secretId;
        // if(secretId) this.setState({ secretIdParam: secretId});

        // this.props.getUserData(handle);
        // axios.get(`/user/${handle}`)
        // .then(res => {
        //     this.setState({
        //         profile: res.data.user
        //     })
        // })
        // .catch(err => console.log(err));
    }

    render() {
        // console.log("moduless", this.props);

        return (
            <p style={{fontSize:"100px"}}>Moduless</p>
        )
    }
}

// adminModule.propTypes = {
//     admin: PropTypes.object.isRequired,
//     UI: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     admin: state.admin,
//     UI: state.UI
// });



// export default connect(mapStateToProps)(adminModule);
// export default (adminModule);