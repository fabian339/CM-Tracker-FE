import { 
    SET_ADMIN, 
    SET_USER,
    SET_AUTHENTICATED_ADMIN, 
    SET_UNAUTHENTICATED_ADMIN, 
    SET_AUTHENTICATED_USER,
    SET_UNAUTHENTICATED_USER,
    LOADING_ADMIN, 
    LOADING_USER,
    SET_ORGANIZATION,
    SET_ORGANIZATIONS,
    ADD_ORGANIZATION
 } from '../types';

const initialState = {
    authenticatedUser: false,
    authenticatedAdmin: false,
    loading: false,
    adminInformation: {},
    userInformation: {},
    organizations: [],
    organization: {},
}

export default function(state = initialState, action){
    // console.log("USER Actionn -->",action);
    switch(action.type){
        case SET_AUTHENTICATED_ADMIN:
            return {
                ...state,
                authenticatedAdmin: true
            };
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                authenticatedUser: true
            };
        case SET_UNAUTHENTICATED_USER:
        case SET_UNAUTHENTICATED_ADMIN:
            return initialState;
                    
        case SET_ADMIN:
            console.log("NAMEE", action.payload)
            return {
                authenticatedAdmin: true,
                loading: false,
                adminInformation: action.payload
            }
        case SET_USER:
        console.log("NAMEE", action.payload)
        return {
            authenticatedUser: true,
            loading: false,
            userInformation: action.payload
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
        case LOADING_USER:
        case LOADING_ADMIN:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}