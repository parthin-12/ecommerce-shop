import React,{Fragment,useEffect, useState} from 'react'
import ProductCard from "../home/ProductCard.js";
import {  getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";
import Loader from '../layout/loader/loader.js';
import "./AllProducts.css";
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom';
import {RiErrorWarningFill} from "react-icons/ri";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/metaData.js';

// const categories =[
//     "All",
//     "Laptop",
//     "Footwears",
//     "Bottoms",
//     "Tops",
//     "Attire",
//     "Cameras",
//     "SmartPhones"
//     ]

const AllProducts = () => {
    
    const dispatch = useDispatch();

    const {loading,products,error,countProducts,productsPerPage,categories}= useSelector((state)=>state.products);
    
    const {keyword} = useParams();

    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [price, setPrice] = useState([0,50000]);
    const [category, setCategory] = useState("");
    const [allcategories, setAllcategories] = useState([]);
    const [rating, setRating] = useState(0);
    const [color, setColor] = useState({});

    const priceHandler = (e,newPrice) =>{
        setPrice(newPrice);
    };

    const setCurrentPage =(e)=>{
        setCurrentPageNo(e);
    }

    const setCategoryFunc=(newCategory,e)=>{
        setColorHandler(e);

        if(newCategory==="All"){
            newCategory=null;
        }
        setCategory(newCategory);
    }

    const ratingHandler=(e,newRating)=>{
        setRating(newRating);
    }

    const setColorHandler=(e)=>{
        
        if(!e.currentTarget){
            e.currentTarget=document.getElementById("categoryLinkAll");
            console.log(e.currentTarget.classList);
        }
        if(Object.keys(color).length!==0){
            color.style.color='rgba(0,0,0,0.5)';
        }
        if(e.currentTarget){
            e.currentTarget.style.color='rgb(0,0,0)';
            setColor(e.currentTarget);
        }
    }


    useEffect(() => {
        if(error){
            toast.error(error);
        }
        else{ 
            if(!category){
                setColorHandler({});
            }

            dispatch(getProducts(currentPageNo,keyword,price,category,rating,8));
            
        }
    }
    , [dispatch,error,currentPageNo,keyword,price,category,rating]);

    if(categories){
        if(allcategories.length===0)
            setAllcategories(categories);
    }
    

    const warningIconOptions={
        size:100,
        color:"tomato"
    }

    const mouseEnter=(e)=>{
        e.target.style.color="tomato";
    }

    const mouseLeave=(e)=>{
        if(e.target===color)
            e.target.style.color="rgb(0,0,0)";
        else
            e.target.style.color="rgba(0,0,0,0.5)";
    }
    
  return (
    <Fragment >
        {loading && loading ? <Loader/> :(
        <Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <div className="productsHeading">Products</div>
            <div className="products">
                {products && countProducts ? products.map((product)=>(
                    <ProductCard product={product} key={product._id}/>
                    )):(
                    <div className='productNotFoundBox'> 
                        <RiErrorWarningFill className='warningIcon' {...warningIconOptions}/>  
                        <h1 className="productNotFound">Product Not Found</h1>
                    </div>
                )}
            </div>
            {products && countProducts > productsPerPage ? <div className="paginationBox">
                <Pagination
                    activePage={currentPageNo}
                    itemsCountPerPage={productsPerPage}
                    totalItemsCount={countProducts}
                    onChange={setCurrentPage}
                    nextPageText="Next"
                    prevPageText="Prev"
                    lastPageText="Last"
                    firstPageText="1st"
                    itemClass='pageItems'
                    linkClass='pageLink'
                    activeClass='activePageItems'
                    activeLinkClass='activePageLink'
                    
                />
            </div>:
            <>
                {currentPageNo>1 && setCurrentPage(1)}
            </>
            }
        </Fragment>
        )}
        <div className="filterBox">
            <Typography>
                Price
            </Typography>
            <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby='range-slider'
            min={0}
            max={50000}
            />

            <Typography>
                Categories
            </Typography>
            <ul className="categoryBox">
                <li
                    key="All"
                    className="categoryLink"
                    id="categoryLinkAll"
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onClick={(e)=>setCategoryFunc("All",e)}   
                    >All</li>
                { allcategories && allcategories.map((e1)=>(
                    <li
                    key={error}
                    className="categoryLink"
                    id={`categoryLink${e1}`}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onClick={(e)=>setCategoryFunc(e1,e)}   
                    >{e1}</li>
                ))}
            </ul>
            <fieldset>
                <Typography component="legend">
                    Ratings Above
                </Typography>
                <Slider
                value={rating}
                onChange={ratingHandler}
                valueLabelDisplay="auto"
                aria-labelledby='continous-slider'
                min={0}
                max={5} 
                />
            </fieldset>

        </div>
  </Fragment>
  )
}

export default AllProducts