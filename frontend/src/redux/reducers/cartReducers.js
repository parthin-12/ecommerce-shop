import { ADD_CART_ITEM, REMOVE_CART_ITEM, SHIPPING_INFO_ITEM } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[],shippingInfo:{}},action)=>{
    switch (action.type) {
        case ADD_CART_ITEM:
            const itemsSend=action.payload;
            const itemExist=state.cartItems.find((e)=>e.product===itemsSend.product);

            if(itemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map((e)=>(
                        e.product===itemsSend.product ? itemsSend :e
                    ))
                }
            }else{
                return {...state,cartItems:[...state.cartItems,itemsSend]};
            }

        case REMOVE_CART_ITEM:
            const item=action.payload;
            const cartItems=state.cartItems.filter((e)=>(
                e.product!==item.product
            ))
            return{
                ...state,
                cartItems: cartItems
            }

        case SHIPPING_INFO_ITEM:
            return{
                ...state,
                shippingInfo:action.payload
            }

        default:
            return state;
    }
} 