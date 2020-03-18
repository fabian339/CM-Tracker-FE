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


const styles = {
    paper: {
        padding: 20,
        margin: "90px 10px"
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    profile: {
    '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
        },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
        },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: '#00bcd4'
        }
        },
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
        },
    '& svg.button': {
        '&:hover': {
        cursor: 'pointer'
        }
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

        const { admin : {loading, authenticated, information: {imageUrl, fullname, createdAt}} } = this.props;  
        
        // let adminInfo = information;  

            console.log("propfile", this.props.admin);
        let profileMarkup = !loading ? (authenticated ? (
            <Paper style={styles.paper}>
                <div className={styles.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" style={styles.profileImage} />
                        {/* <input 
                        type="file" 
                        id="imageInput" 
                        // onChange={this.handleImageChange} 
                        hidden="hidden"
                        /> */}

                        <EditIcon color="primary" />
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/admin/${fullname}`} color="primary" variant="h5">
                            @{fullname}
                        </MuiLink>
                        <hr/>


                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')} </span>
                     </div>

                     {/* <MyButton tip="Logout" onClick={this.handleLogout} > */}
                             <KeyboardReturn color="primary" />
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

const mapStateToProps = (state) => ({
    admin: state.admin
});

const mapActionsToProps = {  };

Profile.propTypes = {
    //  logoutUser: PropTypes.func.isRequired,
    // uploadImage: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapActionsToProps)(Profile)