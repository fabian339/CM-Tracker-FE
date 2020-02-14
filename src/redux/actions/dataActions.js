import { 
    SET_SECRETS, 
    LOADING_DATA, 
    LIKE_SECRET, 
    UNLIKE_SECRET, 
    DELETE_SECRET, 
    SET_ERRORS, 
    CLEAR_ERRORS,
    POST_SECRET,
    LOADING_UI,
    SET_SECRET,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    ON_IMAGE_UPDATED
    } from '../types';
import axios from 'axios';

//get all secrets
export const getSecrets = (imageUpdated) => (dispatch) => {
    // console.log("BEIN CALLED");
    dispatch( { type: LOADING_DATA });
    axios.get('/secrets')
    .then((res) => {
        dispatch({
            type: SET_SECRETS,
            payload: res.data
        });
        //imageUpdated parameter is a  true or false 
        if(imageUpdated){ dispatch(updatedImg());}
    })
    .catch(err => {
        dispatch({
            type: SET_SECRETS,
            payload: []
        });
    });
}

//dispatch an action for when the image is updated
export const updatedImg = () => dispatch => {
    dispatch({ type: ON_IMAGE_UPDATED });
}



export const getSecret = (secretId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/secret/${secretId}`)
    .then((res) => {
        dispatch({
            type: SET_SECRET,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err =>  console.log(err) );
}

//post a secret
export const postSecret = (newSecret) => (dispatch) => {
    dispatch( { type: LOADING_UI });
    axios.post('/secret', newSecret)
    .then((res) => {
        dispatch({
            type: POST_SECRET,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}



//Like a secret
export const likeSecret = (secretId) => (dispatch) => {
    axios.get(`/secret/${secretId}/like`)
    .then((res) => {
        dispatch({
            type: LIKE_SECRET,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
}



//Unlike a secret
export const unlikeSecret = (secretId) => (dispatch) => {
    axios.get(`/secret/${secretId}/unlike`)
    .then((res) => {
        dispatch({
            type: UNLIKE_SECRET,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
}

//submit comment
export const submitComment = (secretId, commentData) => (dispatch) => {
    axios.post(`/secret/${secretId}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}



//delete a secret
export const deleteSecret = (secretId) => (dispatch) => {
    // console.log("CALLEDD");

    axios.delete(`/secret/${secretId}`)
    .then(() => {
        dispatch({
            type: DELETE_SECRET,
            payload: secretId
        });
    })
    .catch(err => console.log(err));
}

export const getUserData = userHandle => dispatch => {
    // console.log("HANDLEEE__>", userHandle);
    dispatch({ type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res => {
        // console.log("THISS DATAA--> ", res.data)
        dispatch({ 
            type: SET_SECRETS,
            payload: res.data.secrets
        });
    })
    .catch(() => {
        dispatch({ 
            type: CLEAR_ERRORS,
            payload: null
         });
    })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}