import axios from "axios";
import { ADD_CART_ITEM, REMOVE_CART_ITEM, SHIPPING_INFO_ITEM } from "../constants/cartConstants";

export const addToCartItems = (id,quantity) => async (dispatch,getState) =>{

        const {data}=await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity
            }
        })

        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};

export const removeCartItems = (id) => async (dispatch,getState) =>{

    dispatch({
        type:REMOVE_CART_ITEM,
        payload:{
            product:id
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};


export const shippingInfoAction = (data) => async (dispatch,getState) =>{

    dispatch({
        type:SHIPPING_INFO_ITEM,
        payload:{
            data
        }
    })

    localStorage.setItem("shippingInfo",JSON.stringify(getState().cart.shippingInfo));
};