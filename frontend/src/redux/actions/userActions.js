import axios from "axios";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_FAIL, LOAD_REQUEST, LOAD_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";

export const loginUser = (newData) =>async(dispatch) =>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};
        let link="/api/v1/login";
        const {data}=await axios.post(link,newData,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const registerUser = (newData) =>async(dispatch) =>{
    try {
        dispatch({
            type:REGISTER_REQUEST
        });

        const config={headers:{"Content-Type":"multipart/form-data"}};
        let link="/api/v1/register";
        const {data}=await axios.post(link,newData,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const loadUser = () =>async(dispatch) =>{
    try {
        dispatch({
            type:LOAD_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};
        let link="/api/v1/user";
        const {data}=await axios.get(link,config);

        dispatch({
            type:LOAD_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:LOAD_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const logoutUser = () =>async(dispatch) =>{
    try {
        let link="/api/v1/logout";
        await axios.get(link);

        dispatch({
            type:LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const updateProfile = (newData)=>async(dispatch) =>{

    try {
        dispatch({
            type:UPDATE_PROFILE_REQUEST
        });

        const config={headers:{"Content-Type":"multipart/form-data"}};
        let link="/api/v1/user/update";
        const {data}=await axios.put(link,newData,config);

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        }); 
    }
}


export const updatePassword = (newData)=>async(dispatch) =>{

    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};
        let link="/api/v1/user/update/password";
        const {data}=await axios.put(link,newData,config);

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message
        }); 
    }
}


export const forgetPassword = (newData) =>async(dispatch) =>{
    try {
        dispatch({
            type:FORGET_PASSWORD_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};
        let link="/api/v1/password/forget";
        const {data}=await axios.post(link,newData,config);

        dispatch({
            type:FORGET_PASSWORD_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:FORGET_PASSWORD_FAIL,
            payload:error.response.data.message
        }); 
    }
}


export const resetPassword = (token,newData) =>async(dispatch) =>{
    try {
        dispatch({
            type:RESET_PASSWORD_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};
        let link=`/api/v1/password/reset/${token}`;
        const {data}=await axios.put(link,newData,config);
        console.log(data);

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        }); 
    }
}



export const resetUpdateProfile = () => async (dispatch) =>{
    dispatch({
        type:UPDATE_PROFILE_RESET
    })
};

export const resetUpdatePassword = () => async (dispatch) =>{
    dispatch({
        type:UPDATE_PASSWORD_RESET
    })
};


export const getAllUsers = (page=1,pageSize=10) =>async(dispatch) =>{
    try {
        dispatch({
            type:ALL_USERS_REQUEST
        });

        let link=`/api/v1/admin/users?page=${page}&pageSize=${pageSize}`;
        const {data}=await axios.get(link);

        dispatch({
            type:ALL_USERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:ALL_USERS_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const getUser = (id) =>async(dispatch) =>{
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        });

        let link=`/api/v1/admin/user/${id}`;
        const {data}=await axios.get(link);

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const deleteUser = (id) =>async(dispatch) =>{
    try {
        dispatch({
            type:DELETE_USER_REQUEST
        });

        let link=`/api/v1/admin/user/${id}`;
        const {data}=await axios.delete(link);

        dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:DELETE_USER_FAIL,
            payload:error.response.data.message
        }); 
    }
}

export const updateUser = (id,dataSend) =>async(dispatch) =>{
    try {
        dispatch({
            type:UPDATE_USER_REQUEST
        });

        let link=`/api/v1/admin/user/${id}`;
        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.put(link,dataSend,config);

        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:UPDATE_USER_FAIL,
            payload:error.response.data.message
        }); 
    }
}


