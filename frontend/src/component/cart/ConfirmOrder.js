import React, { Fragment } from 'react'
import MetaData from '../layout/metaData'
import CheckOutSteps from './CheckOutSteps'
import {Typography} from "@material-ui/core"
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import "./ConfirmOrder.css"

const ConfirmOrder = () => {

    const{user}=useSelector((state)=>(state.user));
    const{data}=useSelector((state)=>(state.cart.shippingInfo));
    const{cartItems}=useSelector((state)=>(state.cart));
    const navigate=useNavigate();

    const subtotal=cartItems.reduce((acc,item)=>(
        acc+(item.price*item.quantity)
    ),0);

    const shippingCharges=subtotal>499?0:50;       /// Free deleivery if subTotal Price is greaterthan 499
    const tax=subtotal*0.18; ////GST 18%
    const totalPrice=subtotal+shippingCharges+tax;

    const address=`${data.address},${data.city},${data.state},${data.pincode},${data.country}`;

    const payment=(e)=>{
        const data={
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo",JSON.stringify(data));

        navigate("/order/payment/process");
    }

  return (
    <Fragment>
        <MetaData title="Confirm Order" />
        <CheckOutSteps activeStep={1}/>
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{data.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                       {cartItems &&
                        cartItems.map((e)=>(
                            <div key={e.product}>
                                <img src={e.image} alt="Product_image"/>
                                <Link to={`/product/${e.product}`}>
                                    {e.name}
                                </Link>
                                <span>
                                    {e.quantity} X ₹{e.price} ={" "}
                                    <b>₹{e.price*e.quantity}</b>
                                </span>
                            </div>
                        ))
                       }
                    </div>
                </div>
            </div>
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className="orderSummaryTotal">
                        <p><b>Total:</b></p>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button onClick={payment}>Procced To Payment</button>
                </div>            
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder