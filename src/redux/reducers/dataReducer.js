import { 
    SET_SECRETS, 
    LOADING_DATA, 
    LIKE_SECRET, 
    UNLIKE_SECRET,
    DELETE_SECRET,
    POST_SECRET,
    SET_SECRET,
    SUBMIT_COMMENT,
    ON_IMAGE_UPDATED
 } from '../types';

const initialState = {
    secrets: [],
    secret: {},
    loading: false,
    imageUpdated: false
}


export default function(state = initialState, action){
    // let index; 
    // console.log("SECRET Actionsn -->",action);
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SECRETS:
            return {
                ...state,
                secrets: action.payload,
                loading: false,
                imageUpdated: false
            };
        case SET_SECRET:
                return {
                    ...state,
                    secret: action.payload,
                };
        case ON_IMAGE_UPDATED:
            return {
                ...state,
                imageUpdated: true
            };                    
        case LIKE_SECRET:
        case UNLIKE_SECRET:
           let index = state.secrets.findIndex((secret) => secret.secretId === action.payload.secretId);
            state.secrets[index] = action.payload;
            if(state.secret.secretId === action.payload.secretId){
                //added comments to the action payload
                let comments = state.secret.comments;
                state.secret = action.payload
                state.secret.comments = comments;
            }
            return {
                ...state,
            }
        case DELETE_SECRET:
            index = state.secrets.findIndex(secret => secret.secretId === action.payload);
            state.secrets.splice(index, 1);
            return {
                ...state
            }
        case POST_SECRET: 
            return {
                ...state,
                secrets: [
                    action.payload,
                    ...state.secrets
                ]
            }
        case SUBMIT_COMMENT: 
            return{
                ...state,
                secret: {
                    ...state.secret,
                    comments: [action.payload, ...state.secret.comments]
                }
            }
        default:
            return state;
    }
}