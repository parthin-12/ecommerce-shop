import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_RESET, NEW_CATEGORY_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_RESET, UPDATE_CATEGORY_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";
import { UPDATE_PASSWORD_FAIL } from "../constants/userConstants";


export const productReducer = (state ={products:[],countProducts:0,message:""},action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[],
                countProducts:0,
                message:"",
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                message:action.payload.message,
                products:action.payload.products,
                countProducts:action.payload.countProducts ,
                productsPerPage:action.payload.productsPerPage,
                outOfStock:action.payload.outOfStock,
                categories:action.payload.categories,
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                message:"",
                products:[],
                error:action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};


export const productDetailsReducer = (state ={product:{}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                product:{},
                error:action.payload
            };

        case PRODUCT_DETAILS_RESET:
            return{
                ...state,
                product:{}
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};


export const newReviewReducer = (state ={},action)=>{
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                message:action.payload.message
            };

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error:action.payload
            };

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success:false
            };    

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};


export const newProductReducer = (state ={product:{}},action)=>{
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                product:action.payload.product
            };

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error:action.payload
            };

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success:false
            };    

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};


export const deleteProductReducer = (state ={},action)=>{
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading:false,
                isDeleted:action.payload,
            };

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            };

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted:false
            };    

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};

export const updateProductReducer = (state ={},action)=>{
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
                isUpdated:false,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading:false,
                isUpdated:action.payload,
            };

        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            };

        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated:false
            };    

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};


export const productReviewsReducer = (state ={reviews:[]},action)=>{
    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case ALL_REVIEWS_SUCCESS:
            return {
                loading:false,
                reviews:action.payload.reviews,
            };
        case ALL_REVIEWS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};

export const reviewReducer = (state ={},action)=>{
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                loading:false,
                isDeleted:action.payload.success,
            };

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error:action.payload
            };

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted:false
            };    

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        default:
            return state
    }
};



export const fetchProductsReducer = (state ={products:[]},action)=>{

    switch (action.type) {
    
        case "FETCH_API_REQUEST":
            return {
                ...state,
                loading:true,
                products:[],
            }

        case "FETCH_API_SUCCESS":
            return{
                loading:false,
                products:action.payload,
            }

        case "FETCH_API_FAIL":
            return{
            ...state,
            loading:false,
            error:action.payload
        }

        case "FETCH_API_RESET":
            return {
                ...state,
                products:[]
            };  
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };   

        default:
            return state;
    }
}


export const categoriesReducer = (state ={},action)=>{
    switch (action.type) {
        case NEW_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                loading:false,
                isUpdated:action.payload.success,
            };

        case NEW_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            };

        case NEW_CATEGORY_RESET:
            return {
                ...state,
                success:false
            };

        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated:false
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            };          
    
        
        default:
            return state
    }
};
