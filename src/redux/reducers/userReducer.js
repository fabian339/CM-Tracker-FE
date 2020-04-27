import { 
    SET_ADMIN, 
    SET_AUTHENTICATED_ADMIN, 
    SET_UNAUTHENTICATED_ADMIN, 
    LOADING_ADMIN, 
 } from '../types';

const initialState = {
    authenticatedAdmin: false,
    loading: false,
    adminInformation: {}
}

export default function(state = initialState, action){
    // console.log("USER Actionn -->",action);
    switch(action.type){
        case SET_AUTHENTICATED_ADMIN:
            return {
                ...state,
                authenticatedAdmin: true
            };
        case SET_UNAUTHENTICATED_ADMIN:
            return initialState;        
        case SET_ADMIN:
            // console.log("NAMEE", action.payload)
            return {
                authenticatedAdmin: true,
                loading: false,
                adminInformation: action.payload
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