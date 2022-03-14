import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    data: null,
    error:null,
    emailerror:null,
    is_coordinator: false,
    is_moderator: false,
    };

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('access',payload.access);
            localStorage.setItem('refresh',payload.refresh);
            return {
                ...state,
                 isAuthenticated :true,
                 access :payload.access,
                 refresh:payload.refresh,
            }
        case USER_LOADED_SUCCESS :
            return {
                ...state,
                user : payload
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                data : payload,
            }
        case USER_LOADED_FAIL :
            return {
                ...state,
                user : null,
                access : null,
                refresh : null,
                
            }
       
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated : false,
                user:null,
                error:payload,
            }
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated : false,
                user:null,
                emailerror:payload,                               

            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated : false,
                user:null,
                data:null,
             
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false , 
                access : null,
                refresh : null,
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return{
                ...state
            }
        default:
            return state
        
    }

}