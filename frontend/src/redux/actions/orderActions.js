import axios from "axios";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants";


export const createOrder =(order) =>async(dispatch)=>{
    try {
        
        dispatch({
            type:CREATE_ORDER_REQUEST
        })

        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.post("/api/v1/order/new",order,config);

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}


export const myOrders =() =>async(dispatch)=>{
    try {
        
        dispatch({
            type:MY_ORDERS_REQUEST
        })

        const {data}=await axios.get("/api/v1/orders/me");

        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}


export const getOrderDetails =(id) =>async(dispatch)=>{
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const {data}=await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
        })

    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAllOrders =(page=1,pageSize=8) =>async(dispatch)=>{
    try {
        dispatch({
            type:ALL_ORDERS_REQUEST
        })

        const {data}=await axios.get(`/api/v1/admin/orders?page=${page}&pageSize=${pageSize}`);

        dispatch({
            type:ALL_ORDERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateOrder = (id,dataSend) => async (dispatch) =>{

    try {
        dispatch({
            type:UPDATE_ORDER_REQUEST
        });

        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.put(`/api/v1/admin/order/${id}`,dataSend,config);

        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data.message
        });
    }
};

export const deleteOrder = (id) => async (dispatch) =>{

    try {
        dispatch({
            type:DELETE_ORDER_REQUEST
        });

        const {data}=await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data.message
        });
    }
};