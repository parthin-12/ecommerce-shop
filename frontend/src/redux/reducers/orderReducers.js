import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/productConstants";


export const newOrderReducer = (state={},action)=>{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        
        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload.order
            } 

        case CREATE_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

export const myOrdersReducer = (state={orders:[]},action)=>{
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return{
                loading:true
            }
        
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload.orders
            } 

        case MY_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={order:{}},action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
                loading:true
            }
        
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order:action.payload,
            } 

        case ORDER_DETAILS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

export const allOrdersReducer = (state={orders:[],totalOrdersSum:0,totalAmounts:[],countOrders:0},action)=>{
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        
        case ALL_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload.orders,
                totalOrdersSum:action.payload.totalOrdersSum,
                totalAmounts:action.payload.totalAmounts,
                countOrders:action.payload.countOrders
            } 

        case ALL_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}

export const orderReducer = (state={},action)=>{
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        
        case UPDATE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            }
            
        case DELETE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload
            }     

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        case UPDATE_ORDER_RESET:
            return{
                ...state,
                loading:false,
                isUpdated:false
            }

        case DELETE_ORDER_RESET:
            return{
                ...state,
                loading:false,
                isDeleted:false
            }    
        

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
}