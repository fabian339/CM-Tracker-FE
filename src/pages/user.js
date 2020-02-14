import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Secret from '../components/secret/Secret'
import StaticProfile from '../components/profile/StaticProfile'

import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import SecretSkeleton from '../util/SecretSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

class user extends Component {
    state = {
        profile: null,
        secretIdParam: null
      };


    componentDidMount(){
        // console.log("DATAAAA PROPSSS", this.props);
        const handle = this.props.match.params.handle;
        const secretId = this.props.match.params.secretId;
        if(secretId) this.setState({ secretIdParam: secretId});

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        const { secrets, loading } = this.props.data;
        const {secretIdParam } = this.state;
        // console.log("SECRETSSS", secrets );
        // console.log("DATAAAA PROPSSS", this.props);

        const secretsMarkup = loading ? (
            <SecretSkeleton />
        ) : secrets === null ? (
            <p> No secrets from this user </p>
        ) : !secretIdParam ? (
            secrets.map(secret => <Secret key={secret.secretId} secret={secret} /> )
        ) : (
            secrets.map(secret => {
                if(secret.secretId !== secretIdParam)
                    return <Secret key={secret.secretId} secret={secret} />
                else return <Secret key={secret.secretId} secret={secret} openDialog/>
            })
        )


        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {secretsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                       <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    ) }
                </Grid>
            </Grid>
            )    
        }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user)