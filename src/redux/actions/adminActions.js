import { 
    SET_ADMIN, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    LOADING_ADMIN,
    STOP_LOADING_UI,
    SET_ORGANIZATION, 
    MARCK_NOTIFICATIONS_READ,
    ADD_ORGANIZATION,
    SET_ORGANIZATIONS,
    LOADING_DATA
    
    } from '../types';

    import {getSecrets} from './dataActions'

import axios from 'axios';

export const loginFunc = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        if(res.data.accountType === "admin"){
            console.log("Data Back", res.data);
            dispatch(getAdminData());
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/admin/${res.data.fullname}/modules`);
        } else {
            dispatch(getAdminData());
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/user/${res.data.fullname}/page`);
        }
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })

    });
}


export const adminRegistration = (newAdminData, history, newPath) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios.post('/registerAdmin', newAdminData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getAdminData());
        dispatch({ type: CLEAR_ERRORS});
        history.push(newPath);
    })
    .catch(err => {
        console.log(err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })

    });
}

export const registerOrg = (newOrgData, history, fullname) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/orgRegister', newOrgData)
    .then((res) => {
        console.log("CALLED")
        dispatch({
            type: ADD_ORGANIZATION,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS});
        dispatch(mergeAdminWithOrg(fullname, res.data.orgId));
        history.push(`/merge/admin/${fullname}/organization/${res.data.orgId}`);
    })
    .catch(err => {
        console.log(err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    //   console.log(err.response)
    });
}

//get organization with name
export const getOrgWithName = (orgName, history, fullname) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/organization/${orgName}`)
    .then((res) => {
        console.log("CALLED")
        dispatch({
            type: SET_ORGANIZATION,
            payload: res.data
        });
        dispatch(mergeAdminWithOrg(fullname, res.data.orgId));
        history.push(`/merge/admin/${fullname}/organization/${res.data.orgId}`);
    })
    .catch(err => {
        console.log(err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    //   console.log(err.response)
    });
}


//get all organizations
export const getOrganizations = () => (dispatch) => {
        // console.log("BEIN CALLED");
        dispatch( { type: LOADING_DATA });
        axios.get('/organizations')
        .then((res) => {
            dispatch({
                type: SET_ORGANIZATIONS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_ORGANIZATIONS,
                payload: []
            });
        });
    }


export const mergeAdminWithOrg = (fullname, orgId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.put(`/merge/admin/${fullname}/organization/${orgId}`)
    .then(res => {
        console.log(res)
        dispatch(getAdminData());
        // dispatch({ type: CLEAR_ERRORS});
    })
    .catch(err => {
        console.log(err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    })
}
// export const getOrgData = (orgId) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios.get(`/organization/${orgId}`)
//     .then((res) => {
//         dispatch({
//             type: SET_ORGANIZATION,
//             payload: res.data
//         });
//         dispatch({ type: STOP_LOADING_UI })
//     })
//     .catch(err =>  console.log(err) );
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