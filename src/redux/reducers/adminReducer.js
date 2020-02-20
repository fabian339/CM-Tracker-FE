import { 
    SET_ADMIN, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    LOADING_ADMIN, 
 } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    admin: true
}

export default function(state = initialState, action){
    // console.log("USER Actionn -->",action);
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
                    
        case SET_ADMIN:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_ADMIN:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}