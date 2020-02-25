import { 
    SET_ADMIN, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    LOADING_ADMIN, 
    SET_ORGANIZATION,
    SET_ORGANIZATIONS,
    ADD_ORGANIZATION,
 } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    admin: true,
    organizations: [],
    organization: {}
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
        case SET_ORGANIZATION:
        case ADD_ORGANIZATION:
            // console.log("REDUCERR",action.payload)
            return {
                ...state,
                loading: false,
                organization: action.payload,
            }
        case SET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload,
                loading: false
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