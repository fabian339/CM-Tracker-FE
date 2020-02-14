import React, { Component, Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';

import Secret from '../components/secret/Secret'
import Profile from '../components/profile/Profile'
import { connect } from 'react-redux'
import { getSecrets } from '../redux/actions/dataActions'

import SecretSkeleton from '../util/SecretSkeleton'
import LinearProgress from '@material-ui/core/LinearProgress';
// import alertFont from url('https://fonts.googleapis.com/css?family=Zhi+Mang+Xing&display=swap');
export class home extends Component {

    componentDidMount(){
        //parameter false because current user image havent change
        this.props.getSecrets(false);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps) {
            // this.setState({ errors: nextProps.UI.errors })
            console.log("NExtPROPSs", nextProps.UI);
        }
    }

    render() {
        const { loading, secrets, imageUpdated } = this.props.data;
        console.log("PROPSS",this.props);
        let recentSecretsMarkup = (!loading) ? 
        <Fragment>
                    { imageUpdated && (
            <p style={alertStyles}>You're Image Profile Has Been Updated Successfully!</p>)}
            {secrets.map(secret => <Secret secret={secret} key={secret.secretId} />)}
        </Fragment>
         : <Fragment>
            <LinearProgress variant="query" color="secondary" />
            <LinearProgress variant="query" />
            <SecretSkeleton />
        </Fragment>;

        return (
        <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
                {recentSecretsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
        )
    }
}

const alertStyles = {
    backgroundColor: "yellowgreen",
    height: "35px",
    textAlign: "center",
    fontSize: "x-large",
    marginTop: "auto",
    color: "olive",
    fontFamily: 'Permanent Marker',
    borderRadius: "15px"
}

home.propTypes = {
    getSecrets: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

export default connect(mapStateToProps, {getSecrets})(home)
