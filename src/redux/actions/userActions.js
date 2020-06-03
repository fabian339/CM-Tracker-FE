import { 
    SET_ADMIN, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_AUTHENTICATED_ADMIN,
    SET_UNAUTHENTICATED_ADMIN, 
    LOADING_ADMIN,
    SET_MESSAGE,
    SET_SIGNATURE_DATA,
    LOADING_DATA,
    SET_ACTIVITIES_DATA,
    SET_SIGNATURE  
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
            history.push(`timesheets/${res.data.fullname}`);
        }
    //     else if(res.data.role === "regular-user"){
    //         dispatch(getUserData(res.data.fullname));
    //         dispatch({type: SET_AUTHENTICATED_USER});
    //         dispatch({ type: CLEAR_ERRORS});
    //         history.push(`/user/${res.data.fullname}/profile`);
    //     }
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    });
}

export const checkInOut = (data, history) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    
    axios.post(`/eshTimesheet`, data)
    .then((res) => {
        dispatch({
            type: SET_MESSAGE,
            payload: res.data
        })
        
        setInterval(() => {
            window.location.reload()

        }, 3000)

    })
    .catch(err => {
        // console.log("ERROR BACK",err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
      dispatch({
        type: SET_MESSAGE,
        payload: []
    })
    });
}


export const submitSignature = (data, history) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    
    axios.post(`/signature`, data)
    .then((res) => {
        dispatch({
            type: SET_SIGNATURE,
            payload: res.data
        })
        
        setInterval(() => {
            window.location.reload()
        }, 3000)

    })
    .catch(err => {
        // console.log("ERROR BACK",err)
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
      dispatch({
        type: SET_SIGNATURE,
        payload: []
    })
    });
}


export const getAdminData = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_ADMIN });
    axios.get(`/admin/${fullname}`)
    .then((res) => {
        // console.log("getting data", res.data)
        dispatch({
            type: SET_ADMIN,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
    })
}

export const getActivities = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.get(`/dataFromTimesheets`)
    .then(res => {
        dispatch(getAdminData(fullname));
        // console.log("Getting data",res.data)
        dispatch({
            type: SET_ACTIVITIES_DATA,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: SET_ACTIVITIES_DATA,
            payload: []
        });
    });
}



export const getSignatures = (fullname) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.get(`/dataFromSignatures`)
    .then(res => {
        dispatch(getAdminData(fullname));
        // console.log("Getting data",res.data)
        dispatch({
            type: SET_SIGNATURE_DATA,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: SET_SIGNATURE_DATA,
            payload: []
        });
    });
}
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('fullname');
    // if(localStorage.role === "admin"){
    dispatch({ type: SET_UNAUTHENTICATED_ADMIN });
    // } else if (localStorage.role === "regular-user"){
    //     dispatch({ type: SET_UNAUTHENTICATED_USER });
    // }
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('role');
}

const setAuthorizationHeader = (token, role, fullname) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    localStorage.setItem('role', role);
    localStorage.setItem('fullname', fullname);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}