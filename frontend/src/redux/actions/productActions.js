import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEWS_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";

export const getProducts = (pageNo=1,keyword="",price=[0,50000],category,rating=0,pageSize=8) => async (dispatch) =>{

    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link=`/api/v1/products?keyword=${keyword}&page=${pageNo}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&pageSize=${pageSize}`;
        if(category){
            link=`/api/v1/products?keyword=${keyword}&page=${pageNo}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}&pageSize=${pageSize}`;
        }

        const {data}=await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
};

export const getProduct = (id) => async (dispatch) =>{

    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });

        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
};


export const newReview = (dataSend) => async (dispatch) =>{

    try {
        dispatch({
            type:NEW_REVIEW_REQUEST
        });


        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.put(`/api/v1/review`,dataSend,config);
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        });
    }
};


export const createProduct = (dataSend) => async (dispatch) =>{

    try {
        dispatch({
            type:NEW_PRODUCT_REQUEST
        });


        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.post(`/api/v1/product/new`,dataSend,config);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

export const deleteProduct = (id) => async (dispatch) =>{

    try {
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        });

        const {data}=await axios.delete(`/api/v1/product/${id}`);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

export const updateProduct = (id,dataSend) => async (dispatch) =>{

    try {
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        });

        const config={headers:{"Content-Type":"multipart/form-data"}};

        const {data}=await axios.put(`/api/v1/product/${id}`,dataSend,config);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};


export const productReviews = (id) => async (dispatch) =>{

    try {
        dispatch({
            type:ALL_REVIEWS_REQUEST
        });


        const {data}=await axios.get(`/api/v1/reviews?productId=${id}`);
        dispatch({
            type:ALL_REVIEWS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_REVIEWS_FAIL,
            payload:error.response.data.message
        });
    }
};

export const deleteProductReview = (productId,reviewId) => async (dispatch) =>{

    try {
        dispatch({
            type:DELETE_REVIEW_REQUEST
        });


        const {data}=await axios.delete(`/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`);
        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message
        });
    }
};



export const fetchProductsApi = (link) =>async(dispatch) =>{
    try {
        dispatch({
            type:"FETCH_API_REQUEST"
        });

        const {data}=await axios.get(link);

        dispatch({
            type:"FETCH_API_SUCCESS",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"FETCH_API_FAIL",
            payload:error.response.data.message
        }); 
    }
}


export const createCategoryAction = (category) =>async(dispatch) =>{
    try {
        dispatch({
            type:NEW_CATEGORY_REQUEST
        });

        const link="/api/v1/category/create";
        const config={headers:{"Content-Type":"application/json"}};
        const {data}=await axios.put(link,category,config);

        dispatch({
            type:NEW_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:NEW_CATEGORY_FAIL,
            payload:error.response.data.message
        }); 
    }
}


export const updateCategoryAction = (sendData,category) =>async(dispatch) =>{
    try {
        dispatch({
            type:UPDATE_CATEGORY_REQUEST
        });

        const link=`/api/v1/category/update?category=${category}`;
        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.put(link,sendData,config);

        dispatch({
            type:UPDATE_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:UPDATE_CATEGORY_FAIL,
            payload:error.response.data.message
        }); 
    }
}