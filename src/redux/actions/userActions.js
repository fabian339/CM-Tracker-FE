import { 
    SET_ADMIN, 
    SET_USER,
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_AUTHENTICATED_ADMIN,
    SET_UNAUTHENTICATED_ADMIN, 
    SET_AUTHENTICATED_USER,
    SET_UNAUTHENTICATED_USER, 
    LOADING_ADMIN,
    LOADING_USER,
    STOP_LOADING_UI,
    SET_ORGANIZATION, 
    MARCK_NOTIFICATIONS_READ,
    ADD_ORGANIZATION,
    SET_ORGANIZATIONS,
    LOADING_DATA,    
    } from '../types';

import axios from 'axios';

export const loginFunc = (data, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', data)
    .then((res) => {
        // console.log(res.data)
        setAuthorizationHeader(res.data.token, res.data.role, res.data.fullname);
        if(res.data.role === "admin"){
            dispatch(getAdminData(res.data.fullname));
            dispatch({type: SET_AUTHENTICATED_ADMIN});
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/admin/${res.data.fullname}/modules`);
        }
        else if(res.data.role === "regular-user"){
            dispatch(getUserData(res.data.fullname));
            dispatch({type: SET_AUTHENTICATED_USER});
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/user/${res.data.fullname}/profile`);
        }
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    });
}

export const getAdminData = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_ADMIN });
    axios.get(`/admin/${fullname}`)
    .then((res) => {
        console.log("getting data", res.data)
        dispatch({
            type: SET_ADMIN,
            payload: res.data
        })
        if(res.data.organization){
            dispatch(getOrganization(res.data.fullname, res.data.organization));
        }
        // console.log("PayloadData-->", res.data.information.organization.orgName)
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getUserData = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get(`/user/${fullname}`)
    .then((res) => {
        console.log("getting data", res.data)
        dispatch({
            type: SET_USER,
            payload: res.data
        })
        // if(res.data.organization){
        //     dispatch(getOrganization(res.data.fullname, res.data.organization));
        // }
        // // console.log("PayloadData-->", res.data.information.organization.orgName)
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getOrganization = (fullname, orgName) => (dispatch) => {
    dispatch( { type: LOADING_DATA });

    axios.get(`/admin/${fullname}/organization/${orgName}`)
    .then((res) => {
        console.log("getting Organization data", res.data)
        dispatch({
            type: SET_ORGANIZATION,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const userRegistration = (newUserData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios.post('/registerUser', newUserData)
    .then((res) => {
        setAuthorizationHeader(res.data.token, res.data.role, res.data.fullname);
        // console.log("Calleddddd", res.data)

        // dispatch(getAdminData(res.data.fullname));
        // dispatch({type: SET_AUTHENTICATED_ADMIN});
        // dispatch({ type: CLEAR_ERRORS});
        if(res.data.role === "admin"){
            dispatch(getAdminData(res.data.fullname));
            dispatch({type: SET_AUTHENTICATED_ADMIN});
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/admin/${res.data.fullname}/org-register`);
        }
        else if(res.data.role === "regular-user"){
            dispatch(getUserData(res.data.fullname));
            dispatch({type: SET_AUTHENTICATED_USER});
            dispatch({ type: CLEAR_ERRORS});
            history.push(`/user/${res.data.fullname}/profile`);
        }
        // dispatch({
        //     type: SET_AUTHENTICATED_PATHNAMES,
        //     payload: newPath
        // })
        // history.push(newPath);
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
    axios.post(`/admin/${fullname}/orgRegister`, newOrgData)
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
export const getOrgToMerge = (orgName, history, fullname) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/admin/${fullname}/organization/${orgName}`)
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
export const getOrganizations = (fullname) => (dispatch) => {
        console.log("BEIN CALLED", fullname);
        dispatch( { type: LOADING_DATA });
        axios.get(`/admin/${fullname}/organizations`)
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

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('fullname');
    if(localStorage.role === "admin"){
        dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
    } else if (localStorage.role === "regular-user"){
        dispatch({ type: SET_UNAUTHENTICATED_USER });
    }
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('role');
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


const setAuthorizationHeader = (token, role, fullname) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    localStorage.setItem('role', role);
    localStorage.setItem('fullname', fullname);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}