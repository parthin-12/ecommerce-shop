import { CLEAR_ERRORS } from "../constants/productConstants";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_FAIL, LOAD_REQUEST, LOAD_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS } from "../constants/userConstants";


export const userReducer = (state ={user:{}},action)=>{

    switch (action.type) {
    
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_REQUEST:
            return {
                ...state,
                loading:true,
                isAuth:false,
                user:{}
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_SUCCESS:
            return{
                loading:false,
                isAuth:true,
                user:action.payload.user
            }

        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuth:false,
                user:{}
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
            ...state,
            loading:false,
            user:{},
            isAuth:false,
            error:action.payload
        }
        
        case LOAD_FAIL:
            return{
            loading:false,
            user:null,
            isAuth:false,
            error:action.payload
        }
        
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                user:{}
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   


        default:
            return state;
    }
}

export const profileReducer = (state={},action) =>{
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
           return {
                ...state,
                loading:true,
                isUpdated:false
           }

        case DELETE_USER_REQUEST:
        return {
                loading:true,
                isDeleted:false
        }           
        
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        return {
            loading:false,
            isUpdated:action.payload.success
        }

        case DELETE_USER_SUCCESS:
            return {
                loading:false,
                isDeleted:action.payload.success
            }
    

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        return {
            ...state,
            loading:false,
            error:action.payload,
        }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return{
                ...state,
                loading:false,
                isUpdated:false
            }

        case DELETE_USER_RESET:
            return{
                ...state,
                loading:false,
                isDeleted:false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   
    
        default:
            return state;
    }
}


export const forgetPasswordReducer = (state={},action) =>{
    switch (action.type) {
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
           return {
               ...state,
                loading:true,
                error:null
           }
        
        case FORGET_PASSWORD_SUCCESS:
        return {
            loading:false,
            message:action.payload.message
        }

        case RESET_PASSWORD_SUCCESS:
            return{
                loading:false,
                success:action.payload.success
            }

        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
        return {
            ...state,
            loading:false,
            error:action.payload,
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   
    
        default:
            return state;
    }
}


export const getAllUsersReducer = (state ={users:[]},action)=>{

    switch (action.type) {
    
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading:true,
                users:[],
                countUsers:0
            }

        case ALL_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload.users,
                countUsers:action.payload.countUsers
            }

        case ALL_USERS_FAIL:
            return{
            ...state,
            loading:false,
            users:[],
            countUsers:0,
            error:action.payload
        }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   

        default:
            return state;
    }
}


export const getUserReducer = (state ={user:{}},action)=>{

    switch (action.type) {
    
        case USER_DETAILS_REQUEST:
            return {
                loading:true,
            }

        case USER_DETAILS_SUCCESS:
            return{
                loading:false,
                user:action.payload.user
            }

        case USER_DETAILS_FAIL:
            return{
            ...state,
            loading:false,
            user:{},
            error:action.payload
        }

        case USER_DETAILS_RESET:
            return{
                ...state,
                user:{}
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   

        default:
            return state;
    }
}


export const testReducer = (state ={products1:[]},action)=>{

    switch (action.type) {
    
        case "t1":
            return {
                ...state,
                loading:true,
                products1:[],
            }

        case "t2":
            return{
                loading:false,
                users:action.payload.users,
                products1:action.payload.products
            }

        case "t3":
            return{
            ...state,
            loading:false,
            error:action.payload
        }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   

        default:
            return state;
    }
}