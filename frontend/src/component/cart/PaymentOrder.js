import React, { Fragment, useEffect, useRef } from 'react'
import CheckOutSteps from './CheckOutSteps'
import MetaData from '../layout/metaData'
import {
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement,
    useStripe,
    useElements
 } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from 'react-redux'
import CreditCardIcon from "@material-ui/icons/CreditCardSharp"
import EventIcon from "@material-ui/icons/EventSharp"
import VpnKeyIcon from "@material-ui/icons/VpnKeySharp"
import { Typography } from '@material-ui/core'
import "./PaymentOrder.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../redux/actions/orderActions'

const PaymentOrder = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const stripe=useStripe();
    const elements=useElements();
    const payRef=useRef(null);

    const {user}=useSelector((state)=>(state.user));
    const {data}=useSelector((state)=>(state.cart.shippingInfo))  //shippingInfo
    const {cartItems}=useSelector((state)=>(state.cart))
    const {error}=useSelector((state)=>(state.newOrder))
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const orderDetails={
        shippingInfo:data,
        orderItems:cartItems,
        itemPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }

    const paymentData={
        amount:Math.round(orderInfo.totalPrice)*100
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        payRef.current.disabled=true;

        try {
            
        const config={headers:{"Content-Type":"application/json"}};

        const getData= await axios.post("/api/v1/order/payment/process",paymentData,config);

        const client_secret=getData.data.client_secret;

        if(!stripe || !elements) return;

        const result=await stripe.confirmCardPayment(client_secret,{payment_method:{
            card:elements.getElement(CardNumberElement),  
            billing_details:{
                name:user.name,
                email:user.email,
                address:{
                    line1:data.address,
                    city:data.city,
                    state:data.state,
                    postal_code:data.pincode,
                    country:data.country,
                },
                phone:data.phoneNo,
            },
        }});

        if(result.error){
            payRef.current.disabled=false;
            toast.error(result.error.message);
        }else{
            if(result.paymentIntent.status==="succeeded"){

                orderDetails.paymentInfo={
                    id:result.paymentIntent.id,
                    status:result.paymentIntent.status};

                dispatch(createOrder(orderDetails));
                if(!error){    
                    navigate("/order/payment/done");
                }
                
            }else{
                payRef.current.disabled=false;
                toast.error("Something Went Wrong In Payment,Please try again after sometime");
            }
        }

        } catch (error) {
            payRef.current.disabled=false;
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if(error){
            toast.error(error)
        }
    }, [error])
    

  return (
    <Fragment>
        <MetaData title="Payment" />
        <CheckOutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={submitHandler}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className='paymentInput' />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit"  value={`Pay - ₹${orderInfo.totalPrice}`} ref={payRef} className="paymentBtn"/>
            </form>
        </div>
    </Fragment>
  )
}

export default PaymentOrder