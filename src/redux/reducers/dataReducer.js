import { 
    SET_ACTIVITIES_DATA, 
    LOADING_DATA, 
    SET_MESSAGE
 } from '../types';

const initialState = {
    activities: {},
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
        case SET_MESSAGE:
            // console.log("NAMEE", action.payload)
            return {
                loading: false,
                message: action.payload
            }  
        default:
            return state;
    }
}