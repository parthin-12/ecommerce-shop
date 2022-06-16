import React,{Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  clearErrors, getProduct, newReview } from '../../redux/actions/productActions';
import { useParams } from "react-router-dom"
import Loader from '../layout/loader/loader';
import Carousel from 'react-material-ui-carousel';
import "./productDetails.css";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./review.js";
import {toast} from "react-toastify"
import MetaData from '../layout/metaData';
import { addToCartItems } from '../../redux/actions/cartActions';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button}from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../redux/constants/productConstants';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    
    const {product,loading,error} =useSelector((state)=>state.product);
    const {error:reviewError,message,success} =useSelector((state)=>state.newReview);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else
      if(reviewError){
        toast.error(reviewError);
      }else
      if(success){
        toast.success(message);
        dispatch({type:NEW_REVIEW_RESET});
      }else{
      dispatch(getProduct(id));
      }
    }, [dispatch,id,error,message,reviewError,success])
    
    const ReactStarsOptions ={
      edit:false,
      color:"rgba(20,20,20,0.2)",
      activeColor:"#FF9529",
      isHalf:true,
      value:product && product.rating,
      size: window.innerWidth < 600 ? 22 : 30
    }

    const AddToCart= () =>{
      if(product.stock>0){
        dispatch(addToCartItems(id,quantity));
        return toast.success("Item Added to cart successfully")
      }else{
        return toast.warning("Product is out of stock")
      }
    }

    const submitReview =()=>{
      if(open){
        setOpen(false);
      }else{
        setOpen(true);
      }
    }

    const reviewSubmitHandler=()=>{

      const myForm = new FormData();

      myForm.set("rating",Number(rating));
      myForm.set("comment",comment);
      myForm.set("productId",id);

      dispatch(newReview(myForm));

      setOpen(false);

    }

  return (
    <Fragment>
        {loading ? <Loader /> :
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="productDetails">
              <div>
                <Carousel>
                  {product.images &&   
                      product.images.map((image,i)=>(
                          <img className='carouselImage'
                          src={image.url}
                          key={image.url} 
                          alt={`${i} Slide`}
                          />       
                          )) 
                      }
                </Carousel>
              </div>
              <div>
                <div className="detailsBlock_1">
                  <h2>{product.name}</h2>
                  <p>Product #{product._id}</p>
                </div>

                <div className="detailsBlock_2">
                  <ReactStars {...ReactStarsOptions}/>
                  <span>({product.numOfReviews} Reviews)</span>
                </div>

                <div className="detailsBlock_3">
                  <h1>₹{product.price}</h1>

                  <div className="detailsBlock_3_1">
                    <div className="detailsBlock_3_1_1">
                      <button onClick={()=>(quantity>1 && setQuantity(quantity-1))}>-</button>
                      <input readOnly type="number" value={product.stock>0?quantity:0}/>
                      <button onClick={()=>(product.stock> quantity && quantity<999 && setQuantity(quantity+1))}>+</button>
                    </div>
                    <button onClick={AddToCart}>Add to Cart</button>
                  </div>

                  <p>Status:
                    <b className={product.stock>0 ? "greenColor": "redColor"}>
                      {product.stock> 0 ? "In Stock":"Out Of Stock"}
                    </b>
                  </p>  

                </div>

                <div className="detailsBlock_4">
                  Description : <p>{product.description}</p>
                </div>

                <button onClick={submitReview} className='btnSubmitReview'>Submit Review</button>
              </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog aria-label='simple-dialog-title' open={open} onClose={submitReview}>
              <DialogTitle style={{display:"flex",justifyContent:"center",textDecoration:"underline"}}>Submit Review</DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating  name="unique-rating" onChange={(e)=>(setRating(Number(e.target.value)))} value={rating} size="large"/>
                <textarea 
                  className='submitDialogTextArea'
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e)=>(setComment(e.target.value))}
                  ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReview} color='secondary'>Cancel</Button>
                <Button onClick={reviewSubmitHandler} color='primary' >Submit</Button>
              </DialogActions>        
          </Dialog>

          <div className="reviews">         
            {product.reviews && product.reviews[0] ?
              product.reviews.map((review)=>(
                <ReviewCard review={review} key={review._id}/>
              ))
            :
            <p className="noReviews">No Reviews Yet</p>
            }
          </div>             
        </Fragment>
        }
    </Fragment>
  )
}

export default ProductDetails