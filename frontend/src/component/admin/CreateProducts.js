import React, { Fragment } from 'react'
import "./NewProduct.css"
import MetaData from '../layout/metaData'
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import DescriptionSharpIcon from "@material-ui/icons/DescriptionSharp";
import StorageSharpIcon from "@material-ui/icons/StorageSharp";
import SpellcheckSharpIcon from "@material-ui/icons/SpellcheckSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import LinkSharpIcon from "@material-ui/icons/LinkSharp";
import ImageSharpIcon from "@material-ui/icons/ImageSharp";
import {MdOutlinePriceCheck} from "react-icons/md"
import {VscSymbolArray} from "react-icons/vsc"
import Sider from './Sider';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants';
import { createProduct, fetchProductsApi } from '../../redux/actions/productActions';
import Loader from '../layout/loader/loader';

const categories =[
    "Laptop",
    "Footwears",
    "Bottoms",
    "Tops",
    "Attire",
    "Cameras",
    "SmartPhones"
    ];

const CreateProducts = () => {

    const dispatch=useDispatch();

    const {products,error:fetchError,loading} =useSelector((state)=>(state.fetchProducts));
    const {success,error,product} =useSelector((state)=>(state.newProduct));

    const [apiLink, setApiLink] = useState("");
    const [isApiLink ,setIsApILink]=useState(false);
    const [creating ,setCreating]=useState(false);
    const [arrayName, setArrayName] = useState("");
    const [name, setName] = useState("title");
    const [price, setPrice] = useState("price");
    const [priceMultiper, setPriceMultiper] = useState(1);
    const [desc, setDesc] = useState("description");
    const [category, setCategory] = useState("category");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState("image");

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(fetchError){
        toast.error(fetchError);
      }else{
        if(success){
            toast.success(`Product ${product.name} Created Successfully`);
            dispatch({type:NEW_PRODUCT_RESET}); 
        }
      }
    }, [dispatch,success,error,fetchError]);

    const accessApiLink=(e)=>{
        e.preventDefault();
        dispatch(fetchProductsApi(apiLink));    
        setIsApILink(true);
    }




    async function createProductSubmitFormHandler (e){
        e.preventDefault();
        setCreating(true);
        let products1=[];
        if(arrayName){
            products1=products[arrayName];
        }else{
            products1=products;
        }


        for (let i = 0; i < products1.length; i++) {

            const myform = new FormData();

            myform.set("name",products1[i][name]);
            myform.set("price",products1[i][price]*priceMultiper);
            myform.set("description",products1[i][desc]);
            myform.set("stock",(stock?products1[i][stock]:100));
            myform.set("category",products1[i][category]);

            if(typeof products1[i][images]==='string'){
                myform.set("images",products1[i][images]);
            }else{
                products1[i][images].forEach(e => {
                    myform.append("images",e);
                
                });
            }
            await dispatch(createProduct(myform));
            
        }
    dispatch({type:"FETCH_API_RESET"});
    setIsApILink(false);
    setCreating(false);
    }
    

  return (
    <Fragment>
        <MetaData title="Create Product"/>
        {loading?<Loader/> :<div className="dashboard">
            <Sider/>
            <div className="newProductContainer">
                <form className='createProductForm' onSubmit={isApiLink?createProductSubmitFormHandler:accessApiLink} encType="multipart/form-data">
                    <h1>Create Products</h1>
                {!isApiLink &&<div>
                        <LinkSharpIcon />
                        <input 
                        type="text"
                        placeholder='API Link'
                        required
                        value={apiLink}
                        onChange={(e)=>(setApiLink(e.target.value))} 
                        />
                    </div>}

                {isApiLink &&
                    <div>
                        <VscSymbolArray />
                        <input 
                        type="text"
                        placeholder='Product Array Varaible'
                        value={arrayName}
                        onChange={(e)=>(setArrayName(e.target.value))} 
                        />
                    </div>}
                {isApiLink &&
                    <div>
                        <SpellcheckSharpIcon />
                        <input 
                        type="text"
                        placeholder='Product Name Varaible'
                        required
                        value={name}
                        onChange={(e)=>(setName(e.target.value))} 
                        />
                    </div>}
                {isApiLink &&
                    <div>
                        <AttachMoneySharpIcon />
                        <input 
                        type="text"
                        placeholder='Price Varaible'
                        required
                        value={price}
                        onChange={(e)=>(setPrice(e.target.value))} 
                        />
                    </div>}

                {isApiLink &&
                    <div>
                        <MdOutlinePriceCheck />
                        <input 
                        type="number"
                        placeholder='Price Multiple by (ex:1)'
                        value={priceMultiper}
                        required
                        onChange={(e)=>(setPriceMultiper(e.target.value))} 
                        />
                    </div>}
                {isApiLink &&
                    <div>
                        <DescriptionSharpIcon />
                        <input 
                        type="text"
                        placeholder='Description Varaible'
                        required
                        value={desc}
                        onChange={(e)=>(setDesc(e.target.value))} 
                        />
                    </div>}
                {isApiLink &&
                    <div>
                        <AccountTreeSharpIcon />
                        <input 
                        type="text"
                        placeholder='Category Varaible' 
                        required
                        value={category}
                        onChange={(e)=>(setCategory(e.target.value))} 
                        />
                    </div>}

                {isApiLink &&
                    <div>
                        <StorageSharpIcon />
                        <input 
                        type="text"
                        placeholder='Stock Varaible'
                        value={stock}
                        onChange={(e)=>(setStock(e.target.value))} 
                        />
                    </div>}
                {isApiLink &&
                    <div>
                        <ImageSharpIcon />
                        <input 
                        type="text"
                        placeholder='Images Varaible'
                        required
                        value={images}
                        onChange={(e)=>(setImages(e.target.value))} 
                        />
                    </div>}
                    {/* <Button onClick={accessApiLink}>search</Button> */}
                    <Button id="createProductBtn" type="submit" disabled={creating?true:false}>Create</Button>               
                </form>
                {isApiLink && <p><p><h6>*if there is no product array or stock varaiable name in api then just leave blank</h6></p>
                <p><h6>*Remaining varaiables names must be there</h6></p>
                <p><h6>*In Price Multiple,If api have price in Rupee then just multiply by "1" otherwise multiple by respective currency(Relative with rupee)</h6></p>
                </p>
                }
            </div>
        </div>}
    </Fragment>

  )
}


export default CreateProducts