import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircleSharp"
import { Typography } from '@material-ui/core'


import "./OrderSuccess.css"
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your Order has been Placed Successfully</Typography>
        <Link to="/account/orders">View Orders</Link>
        </div>
  )
}

export default OrderSuccess