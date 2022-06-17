import React, { Fragment } from 'react'
import "./NewProduct.css"
import MetaData from '../layout/metaData'
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import DescriptionSharpIcon from "@material-ui/icons/DescriptionSharp";
import StorageSharpIcon from "@material-ui/icons/StorageSharp";
import SpellcheckSharpIcon from "@material-ui/icons/SpellcheckSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import Sider from './Sider';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants';
import { createProduct, getProducts } from '../../redux/actions/productActions';

// const categories =[
//     "Laptop",
//     "Footwears",
//     "Bottoms",
//     "Tops",
//     "Attire",
//     "Cameras",
//     "SmartPhones"
//     ];

const NewProduct = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading,error,success} =useSelector((state)=>(state.newProduct));
    const {categories} =useSelector((state)=>(state.products));

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else{
        if(success){
            toast.success("Product Created Successfully");
            dispatch({type:NEW_PRODUCT_RESET}); 
            navigate("/admin/dashboard");
        }
        dispatch(getProducts());
      }
    }, [dispatch,success,navigate,error]);

    const createProductSubmitFormHandler =(e)=>{
        e.preventDefault();
        if(!category){
            return toast.error("Please Select Category");
        }
        const myform = new FormData();

        myform.set("name",name);
        myform.set("price",price);
        myform.set("description",desc);
        myform.set("stock",stock);
        myform.set("category",category);

        images.forEach(e => {
            myform.append("images",e);
        });

        dispatch(createProduct(myform));
    }

    const createProductImagesChange=(e)=>{
        const files=Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);

        files.forEach(element => {
            const reader= new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            };

            reader.readAsDataURL(element);

        });

    }
    

  return (
    <Fragment>
        <MetaData title="Create Product"/>
        <div className="dashboard">
            <Sider/>
            <div className="newProductContainer">
                <form className='createProductForm' onSubmit={createProductSubmitFormHandler} encType="multipart/form-data">
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckSharpIcon />
                        <input 
                        type="text"
                        placeholder='Product Name'
                        required
                        value={name}
                        onChange={(e)=>(setName(e.target.value))} 
                        />
                    </div>
                    <div>
                        <AttachMoneySharpIcon />
                        <input 
                        type="number"
                        placeholder='Price'
                        required
                        value={price}
                        onChange={(e)=>(setPrice(e.target.value))} 
                        />
                    </div>
                    <div>
                        <DescriptionSharpIcon />
                        <textarea
                            placeholder='Product Description'
                            value={desc}
                            required
                            onChange={(e)=>(setDesc(e.target.value))} 
                            cols="30"
                            rows="1" 
                        >
                        </textarea>
                    </div>
                    <div>
                        <AccountTreeSharpIcon />
                        <select
                            onChange={(e)=>(setCategory(e.target.value))}
                            required 
                        >
                            <option value="">Choose Category</option>
                            {categories && categories.map((e)=>(
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageSharpIcon />
                        <input 
                        type="number"
                        placeholder='Stock'
                        required
                        value={stock}
                        onChange={(e)=>(setStock(e.target.value))} 
                        />
                    </div>
                    
                    <div id="createProductFile">
                        <input type="file" name="avatar" accept='image/*' className="uploadBtn" multiple onChange={createProductImagesChange}/>
                    </div>

                    <div className="createProductImages">
                        {imagesPreview.map((e,i)=>(
                            <img key={i} src={e} alt="Product Preview"/>
                        ))}
                    </div>

                    <Button id="createProductBtn" type="submit" disabled={loading?true:false}>Create</Button>               
                </form>
            </div>
        </div>
    </Fragment>

  )
}

export default NewProduct