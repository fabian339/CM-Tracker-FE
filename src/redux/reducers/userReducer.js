import { 
    SET_USER, 
    SET_AUTHENTICATED_USER, 
    SET_UNAUTHENTICATED_USER, 
    LOADING_USER, 
 } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    admin: false
}

export default function(state = initialState, action){
    // console.log("USER Actionn -->",action);
    switch(action.type){
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED_USER:
            return initialState;
                    
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}