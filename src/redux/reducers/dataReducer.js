import { 
    SET_ACTIVITIES_DATA, 
    SET_SIGNATURE_DATA,
    LOADING_DATA, 
    SET_MESSAGE,
    SET_SIGNATURE
 } from '../types';

const initialState = {
    activities: {},
    signatures: {},
    message: {},
    loading: false,
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
        case SET_ACTIVITIES_DATA:
            return {
                ...state,
                activities: action.payload,
                loading: false
            }
        case SET_SIGNATURE_DATA:
            return {
                ...state,
                signatures: action.payload,
                loading: false
            }
        case SET_MESSAGE:
            // console.log("NAMEE", action.payload)
            return {
                loading: false,
                message: action.payload
            }  
        case SET_SIGNATURE:
            // console.log("NAMEE", action.payload)
            return {
                loading: false,
                message: action.payload
            } 
        default:
            return state;
    }
}