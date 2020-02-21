import { 
    SET_ADMIN, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    LOADING_ADMIN, 
    MARCK_NOTIFICATIONS_READ,
    } from '../types';

    import {getSecrets} from './dataActions'

import axios from 'axios';

// export const loginUser = (userData, history) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios.post('/login', userData)
//     .then((res) => {
//         setAuthorizationHeader(res.data.token);
//         dispatch(getUserData());
//         dispatch({ type: CLEAR_ERRORS});
//         history.push('/');
//     })
//     .catch(err => {
//       dispatch({
//           type: SET_ERRORS,
//           payload: err.response.data
//       })

//     });
// }


export const adminRegistration = (newAdminData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios.post('/registerAdmin', newAdminData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getAdminData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/org-register');
    })
    .catch(err => {
        console.log(err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })

    });
}

// export const organizationAction = (newUserData, history) => (dispatch) => {
// }



export const logoutAdminUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}



export const getAdminData = () => (dispatch) => {
    dispatch({ type: LOADING_ADMIN });
            console.log("Calledd")
    axios.get('/admin')
    .then((res) => {
        dispatch({
            type: SET_ADMIN,
            payload: res.data
        })
        // console.log("PayloadData-->", res.data)
    })
    .catch(err => {
        console.log(err);
    })
}

// export const uploadImage = (formData) => (dispatch) => {
//     // dispatch( { type: ON_IMAGE_CHANGE });
//     dispatch({ type: LOADING_USER });
//     axios.post('/user/image', formData)
//     .then(() => {
//         dispatch(getUserData());
//         //refetch secrets from serve after 2 seconds to avoid incorrect data
//         setTimeout(() => {dispatch(getSecrets(true))}, 2500);
//     })
//     .catch(err => console.log(err));
// }


// export const editUserDetails = (userDetails) => (dispatch) => {
//     dispatch({ type: LOADING_USER});

//     axios.post('/user', userDetails)
//     .then(() => {
//         dispatch(getUserData());
//     })
//     .catch(err => console.log(err));
// }


// export const markNotificationsRead = (notificationIds) => (dispatch) => {
//     axios.post('/notifications', notificationIds)
//     .then(res => {
//         dispatch({ type: MARCK_NOTIFICATIONS_READ })
//     })
//     .catch(err => console.log(err));
// }


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}