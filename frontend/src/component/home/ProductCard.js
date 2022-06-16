import React from 'react';
import ReactRating from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const product = ({product}) => {
    let options ={
        edit:false,
        color:"rgba(20,20,20,0.2)",
        activeColor:"#FF9529",
        isHalf:true,
        value:product.rating,
        size: window.innerWidth < 600 ? 22 : 28
    };
    return (
        <Link className='productCard' to={`/product/${product._id}`}> 
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactRating {...options}/>
            <span>({`${product.numOfReviews} Reviews`})</span>
        </div>
        <span>{`₹${product.price}`}</span>
     </Link>
  )
}

export default product