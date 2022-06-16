import React,{Fragment, useEffect} from 'react'
import {CgMouse} from "react-icons/cg"
import "./home.css";
import Product from "./ProductCard.js";
import MetaData  from '../layout/metaData.js';
import { getProducts } from '../../redux/actions/productActions.js';
import {useDispatch, useSelector} from "react-redux";
import Loader from '../layout/loader/loader';
import { toast } from "react-toastify"

const Home = () => {
  const dispatch=useDispatch();
  const {loading,products,error} = useSelector((state)=>state.products);


  useEffect(()=>{
    if(error){
      return toast.error(error);
    }
    dispatch(getProducts());
  },[dispatch,error]);


  return (
    <Fragment>
      { loading ? <Loader />: 
      <Fragment>
        <MetaData title="ECOMMERCE"/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href='#container'>
          <button>
            Scroll <CgMouse />
          </button>
        </a>
        <div className="bannerCutter"></div>
      </div>
    <div className="homeHeading">Featured Products</div>
    <div className="container" id= "container">
    {products && products.map(product =>(
      <Product product={product} key={product._id}/>
    ))}
    </div>
  </Fragment>}
    </Fragment>
  );
};

export default Home;