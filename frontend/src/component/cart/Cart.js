import React, { Fragment } from 'react'
import {Typography} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { addToCartItems } from '../../redux/actions/cartActions'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCartSharp";
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/metaData';

const Cart = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {cartItems}=useSelector((state)=>(state.cart));


    const checkOutHandle =()=>{
        navigate("/login?redirect=/shipping");
    }

  return (
      <Fragment>
        <MetaData title="Cart" />
    {cartItems.length?<Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity1</p>
                <p>Subtotal</p>
            </div>

            {cartItems.map((e,i)=>(
                <div className="cartContainer">
                    <CartItemCard item={e} key={e.product}/>
                    <div className="cartInput">
                        <button onClick={()=>(e.quantity>1 && dispatch(addToCartItems(e.product,e.quantity-1)))}>-</button>
                        <input type="text" readOnly value={e.quantity}/>
                        <button onClick={()=>(e.stock> e.quantity && e.quantity<999 && dispatch(addToCartItems(e.product,e.quantity+1)))}>+</button>
                    </div>
                    <p className="cartSubtotal">₹{e.price*e.quantity}</p>
                </div>
            ))}

            <div className="cartGrossTotal">
                <div></div>
                <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>₹{cartItems.reduce((acc,item)=>(acc+(item.price*item.quantity)),0)}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkOutHandle}>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>:
    <div className='emptyCart'>
        <RemoveShoppingCartIcon />
        <Typography>No Product in Your Cart</Typography>
        <Link to="/products" >View Products</Link>
    </div>
    }
    </Fragment>
  )
}

export default Cart