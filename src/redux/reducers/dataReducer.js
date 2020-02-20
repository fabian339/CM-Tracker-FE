import { 
    SET_CLIENTS, 
    LOADING_DATA, 
    ADD_CLIENT,
    SET_CLIENT
 } from '../types';

const initialState = {
    clients: [],
    clients: {},
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
        case SET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
                loading: false,
            };
        case SET_CLIENT:
                return {
                    ...state,
                    secret: action.payload,
                };                 
        case ADD_CLIENT: 
            return {
                ...state,
                clients: [
                    action.payload,
                    ...state.secrets
                ]
            }
        default:
            return state;
    }
}