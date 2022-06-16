import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/metaData'
import {Typography} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate, useParams } from 'react-router-dom'
import Sider from './Sider';
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import "./ProcessOrders.css"
import { toast } from 'react-toastify'
import { getOrderDetails, updateOrder } from '../../redux/actions/orderActions'
import Loader from '../layout/loader/loader'
import { Button } from '@material-ui/core';
import { useState } from 'react'
import { UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants'


const ProcessOrders = () => {
    const{order,error,loading}=useSelector((state)=>(state.orderDetails));
    const{isUpdated,error:orderError}=useSelector((state)=>(state.order));
    const dispatch=useDispatch();

    const [status, setStatus] = useState("");


    const {id}=useParams();


    useEffect(() => {

        if(error){
           toast.error(error);
        }else if(orderError){
           toast.error(orderError);
        }else{

            if(isUpdated){
                toast.success(`Product ${status} Successfully`);
                dispatch({type:UPDATE_ORDER_RESET});
            }

            dispatch(getOrderDetails(id))
        }
      }, [dispatch,error,id,isUpdated,orderError]);


    const updateorderSubmitFormHandler=(e)=>{
        e.preventDefault();

        const myform = new FormData();
        myform.set("orderStatus",status);

        dispatch(updateOrder(id,myform));
    }

  return (

    <Fragment>
        <MetaData title="Process Order"/>
        <div className="dashboard">
            <Sider/>
            <div className="newProductContainer">
                {loading ?<Loader/> :
                    <div className="confirmOrderPage" style={{display:order && order.orderStatus==="Delivered"?"block":"grid"}}>
                    <div>
                        <div className="confirmShippingArea">
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

                        <div className="confirmCartItems">
                            <Typography>Your Cart Items:</Typography>
                            <div className="confirmCartItemsContainer">
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
                    {order && order.orderStatus
                    !=="Delivered" && <div>
                        <form className='updateOrderForm' onSubmit={updateorderSubmitFormHandler} >
                            <h1>Process Order</h1>
                            <div>
                                <AccountTreeSharpIcon />
                                <select
                                    onChange={(e)=>(setStatus(e.target.value))}
                                    value={status}
                                >
                                    <option value="">Choose Category</option>
                                    {order && order.orderStatus==="Processing" &&
                                    <option value="Shippied">Shippied</option>}
                                    {order && order.orderStatus==="Shippied" &&
                                    <option value="Delivered">Delivered</option>}
                                </select>
                            </div>

                            <Button id="updateProductBtn" type="submit" disabled={(loading || status==="")?true:false}>Update</Button>               
                        </form>
                    </div>}
                </div>
                }
            </div>
        </div>
    </Fragment>
  )
}


export default ProcessOrders