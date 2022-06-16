import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../redux/actions/orderActions';
import "./OrderDetails.css"
import MetaData from '../layout/metaData';
import Loader from '../layout/loader/loader';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';

const OrderDetails = () => {
    
    const {order,loading,error} =useSelector((state)=>(state.orderDetails))
    const dispatch=useDispatch();
    const {id}=useParams();


    useEffect(() => {

        if(error){
           toast.error(error);
        }else{
            dispatch(getOrderDetails(id))
        }
      }, [dispatch,error,id]);
    

  return (
    <Fragment>
        {loading? <Loader/>:
            <Fragment>
                <MetaData title="Order Details" />
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">Order #{order && order._id}</Typography>
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{order && order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{order && order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country}`}</span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order && order.paymentInfo && order.paymentInfo.status==="succeeded"?"greenColor":"redColor"}>
                                    {order && order.paymentInfo && order.paymentInfo.status==="succeeded"?"PAID":"NOT PAID"}   
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>₹{order && order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order && order.orderStatus && order.orderStatus==="Delivered"?"greenColor":"redColor"}>
                                    {order && order.orderStatus && order.orderStatus}   
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailsCartItems">
                        <Typography>Order Items</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            { order && order.orderItems &&
                                order.orderItems.map((e)=>(
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
            </Fragment>
        }
    </Fragment>

  )
}

export default OrderDetails