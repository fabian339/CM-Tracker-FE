// import PropTypes from 'prop-types';
// import React, { Component, Fragment } from 'react'
// import withStyles from '@material-ui/core/styles/withStyles';
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import dayjs from 'dayjs'
// import { logoutUser, uploadImage } from '../../redux/actions/userActions'
// // import { refreshSecrets } from '../../redux/actions/dataActions'

// import EditDetails from './EditDetails'
// import ProfileSkeleton from '../../util/ProfileSkeleton'



// //MUI stuff
// import Button from '@material-ui/core/Button';
// import MuiLink from '@material-ui/core/Link'
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import LinearProgress from '@material-ui/core/LinearProgress';


// //Icons
// import LocationOn from '@material-ui/icons/LocationOn'
// import LinkIcon from '@material-ui/icons/Link'
// import CalendarToday from '@material-ui/icons/CalendarToday'
// import EditIcon from '@material-ui/icons/Edit'
// import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
// import MyButton from '../../util/MyButton';

// const styles = (theme) => ({
//     ...theme.spreadIt
// });

// export class Profile extends Component {

//     // handleImageChange = (event) => {

//     //     const image = event.target.files[0];
//     //     //send to server
//     //     const formData = new FormData();
//     //     formData.append('image', image, image.name);
//     //     this.props.uploadImage(formData);
//     // }

//     // handleEditPicture = () => {
//     //     const fileInput = document.getElementById('imageInput');
//     //     fileInput.click();

//     // }

//     handleLogout = () => {
//         this.props.logoutUser();
//     }

//     render() {
//         const { 
//             user: { 
//         //         credentials: { handle, createdAt, imageUrl, bio, website, location }, 
//                 loading,
//                 authenticated
//                 }
//             } = this.props;
//             // console.log(imageUrl);
//         let profileMarkup = (
//             <Fragment>
//                 <p>Profile</p>
//             </Fragment>
//         )


//         return profileMarkup;
//     }
// }

// const mapStateToProps = (state) => ({
//     user: state.user,
// });

// const mapActionsToProps = { logoutUser };

// Profile.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     // uploadImage: PropTypes.func.isRequired,
//     // classes: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired
// }

// export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile))
