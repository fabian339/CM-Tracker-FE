import { 
    SET_ADMIN, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_AUTHENTICATED_ADMIN,
    SET_UNAUTHENTICATED_ADMIN, 
    SET_AUTHENTICATED_USER,
    LOADING_ADMIN,
    STOP_LOADING_UI,
    SET_ORGANIZATION, 
    MARCK_NOTIFICATIONS_READ,
    ADD_ORGANIZATION,
    SET_ORGANIZATIONS,
    LOADING_DATA,
    SET_AUTHENTICATED_PATHNAMES
    
    } from '../types';

    import {getUserData, logoutUser} from './userActions'

import axios from 'axios';

export const loginFunc = (data, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', data)
    .then((res) => {
        // console.log(res.data)
        setAuthorizationHeader(res.data.token, res.data.accountType, res.data.fullname);
        if(res.data.accountType === "admin"){
            console.log("Data Back", res.data.fullname, "History", history);
            console.log("Called", "getAdminData")
            dispatch(getAdminData(res.data.fullname));
            let pathName = `/admin/${res.data.fullname}/modules`
            dispatch({type: SET_AUTHENTICATED_ADMIN});
            // dispatch({
            //     type: SET_AUTHENTICATED_PATHNAMES,
            //     payload: pathName
            // })
            dispatch({ type: CLEAR_ERRORS});
            history.push(pathName);
        }
        // } else {
        //     dispatch(getUserData());
        //     dispatch({
        //         type: SET_AUTHENTICATED_ADMIN,
        //         payload: res.data.fullame
        //     });
        //     dispatch({ type: CLEAR_ERRORS});
        //     history.push(`/user/${res.data.fullname}/page`);
        // }
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
        setAuthorizationHeader(res.data.token, 'admin');
        console.log("Called", "getAdminData")

        dispatch(getAdminData());
        dispatch({type: SET_AUTHENTICATED_ADMIN});
        dispatch({ type: CLEAR_ERRORS});
        // dispatch({
        //     type: SET_AUTHENTICATED_PATHNAMES,
        //     payload: newPath
        // })
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
        let pathName = `/merge/admin/${fullname}/organization/${res.data.orgId}`;
        // dispatch({
        //     type: SET_AUTHENTICATED_PATHNAMES,
        //     payload: pathName
        // })
        history.push(pathName);
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
        let pathName = `/merge/admin/${fullname}/organization/${res.data.orgId}`;
        // dispatch({
        //     type: SET_AUTHENTICATED_PATHNAMES,
        //     payload: pathName
        // })
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
    console.log("Called", "getAdminData")

    axios.put(`/merge/admin/${fullname}/organization/${orgId}`)
    .then(res => {
        console.log(res)
        dispatch(getAdminData(fullname));
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



export const logoutAdmin = () => (dispatch) => {
    if (localStorage.accType === "admin"){
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
    } else {
        dispatch(logoutUser());
    }
    localStorage.removeItem('accType');
    localStorage.removeItem('fullname');
}



export const getAdminData = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_ADMIN });
    //HEREEE
    console.log("this call", fullname);

    axios.get(`/admin/${fullname}`)
    .then((res) => {
        dispatch({
            type: SET_ADMIN,
            payload: res.data
        })
        // console.log("PayloadData-->", res.data)
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
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


const setAuthorizationHeader = (token, accType, fullname) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    localStorage.setItem('accType', accType);
    localStorage.setItem('fullname', fullname);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}