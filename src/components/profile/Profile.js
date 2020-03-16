import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'
// import { refreshSecrets } from '../../redux/actions/dataActions'

import EditDetails from './EditDetails'
import ProfileSkeleton from '../../util/ProfileSkeleton'



//MUI stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';


//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import MyButton from '../../util/MyButton';


export class Profile extends Component {

    // handleImageChange = (event) => {
    //     const image = event.target.files[0];
    //     //send to server
    //     const formData = new FormData();
    //     formData.append('image', image, image.name);
    //     this.props.uploadImage(formData);
    // }

    // handleEditPicture = () => {
    //     const fileInput = document.getElementById('imageInput');
    //     fileInput.click();

    // }

    // handleLogout = () => {
    //     this.props.logoutUser();
    // }

    render() {
        const { 
            classes, 
            user: { 
                credentials: { handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated
                }
            } = this.props;
            // console.log(imageUrl);
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input 
                        type="file" 
                        id="imageInput" 
                        onChange={this.handleImageChange} 
                        hidden="hidden"
                        />

                        <MyButton tip="Edit profile Picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>

                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>

                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}

                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}{website}
                                    </a>
                                <hr/>
                            </Fragment>
                        )}

                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                    </div>

                    <MyButton tip="Logout" onClick={this.handleLogout} >
                            <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : <Fragment>
            <LinearProgress variant="query" color="secondary" />
            <LinearProgress variant="query" />
            <ProfileSkeleton />
        </Fragment>

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin
});

const mapActionsToProps = {  };

Profile.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    // uploadImage: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapActionsToProps)(Profile)