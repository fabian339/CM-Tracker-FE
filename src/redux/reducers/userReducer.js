import { SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    LOADING_USER, 
    LIKE_SECRET,
    UNLIKE_SECRET,
    MARCK_NOTIFICATIONS_READ,
 } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
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
        case LIKE_SECRET:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        secretId: action.payload.secretId
                    }
                ]
            }
        case UNLIKE_SECRET:
            return {
                ...state,
                likes: state.likes.filter(like => like.secretId !== action.payload.secretId)
            }
        case MARCK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true);
            return{
                ...state
            }
        default:
            return state;
    }
}