import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, updateProductReducer,productReducer, productReviewsReducer, reviewReducer, fetchProductsReducer, categoriesReducer} from "./reducers/productReducers";
import { forgetPasswordReducer, getAllUsersReducer, getUserReducer, profileReducer, userReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer,orderReducer } from "./reducers/orderReducers";

const reducer =combineReducers({
    products:productReducer,
    product:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgetPassword:forgetPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
    updateProduct:updateProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:getAllUsersReducer,
    getUser:getUserReducer,
    getProductReviews:productReviewsReducer,
    deleteReview:reviewReducer,
    fetchProducts:fetchProductsReducer,
    categories:categoriesReducer
});

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
    }
};

const middleware = [thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

