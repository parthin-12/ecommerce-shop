import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCartItems } from '../../redux/actions/cartActions'
import "./CartItemCard.css"

const CartItemCard = ({item}) => {

  const dispatch=useDispatch();

  return (
    <div className="cardItemContainer">
        <img src={item.image} alt="Product_image"/>
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>(dispatch(removeCartItems(item.product)))}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard