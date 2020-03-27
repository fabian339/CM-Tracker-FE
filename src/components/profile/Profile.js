import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
// import { refreshSecrets } from '../../redux/actions/dataActions'

import EditDetails from './EditDetails'
import ProfileSkeleton from '../../util/ProfileSkeleton'



//MUI stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';


//Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
// import MyButton from '../../util/MyButton';


const styles = {
    paper: {
        padding: 20,
        margin: "90px 10px",
        backgroundColor: "whitesmoke"
    },
    profileImage: {
        width: 100,
        // height: 200,
        objectFit: 'cover',
        // maxWidth: '100%',
        borderRadius: '50%'
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    profileDetails: {
        textAlign: 'center',
        '& span, svg': {
            verticalAlign: 'middle'
        },
        '& a': {
            color: '#00bcd4'
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
            }
    }
}

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
            user : {
            loading, 
            authenticatedAdmin, 
            adminInformation: {
                imageUrl, 
                fullname, 
                createdAt,
                firstN,
                lastN,
                organization,
                email,
                orgVerified,
                emailVerified
            }
        }
    } = this.props;  
    var name = firstN + ' ' + lastN;


        console.log("propfile", this.props);
        let profileMarkup = !loading ? (authenticatedAdmin ? (
            <Paper style={styles.paper}>
                <div className={styles.profile}>
                    <div style={styles.imageWrapper}>
                        <div>
                            <MuiLink component={Link} to={`/admin/${fullname}`} color="primary" variant="h6">
                                {/* @{fullname.replace(/_/g, " ").toUpperCase()} */}
                                @{name.toUpperCase()}
                            </MuiLink>
                        </div>
                        <img src={imageUrl} alt="profile" style={styles.profileImage} />
                        {/* <input 
                        type="file" 
                        id="imageInput" 
                        // onChange={this.handleImageChange} 
                        hidden="hidden"
                        /> */}
                        <Tooltip title="Upload">
                            <PhotoCameraIcon color="primary" />
                        </Tooltip>

                    </div>
                    <hr/>
                    <div style={styles.profileDetails}>
                        <p> Name: {name.toUpperCase()} </p>
                        <p> email: {email} </p>
                        {!emailVerified && (
                            <small style={{color:"red"}}>Please verify email*</small>
                        )}
                        <p> Administrator at: {organization} </p>
                        {!orgVerified && (
                            <small style={{color:"red"}}>Please verify organization*</small>
                        )}
                        <hr/>

                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                        <CalendarToday color="primary"/>

                     </div>

                     {/* <MyButton tip="Logout" onClick={this.handleLogout} > */}
                             {/* <KeyboardReturn color="primary" /> */}
                     {/* </MyButton> */}
                     {/* <EditDetails /> */}
                 </div>
             </Paper>
             ) : (
            <Paper className={styles.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login
                </Typography>
            </Paper>
        )) : <Fragment>
            <LinearProgress variant="query" color="secondary" />
            <LinearProgress variant="query" />
            {/* <ProfileSkeleton /> */}
        </Fragment>

        return  profileMarkup;

    }
}


Profile.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Profile)