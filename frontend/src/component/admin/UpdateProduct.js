import React, { Fragment } from 'react'
import "./UpdateProduct.css"
import MetaData from '../layout/metaData'
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import DescriptionSharpIcon from "@material-ui/icons/DescriptionSharp";
import StorageSharpIcon from "@material-ui/icons/StorageSharp";
import SpellcheckSharpIcon from "@material-ui/icons/SpellcheckSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import Sider from './Sider';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PRODUCT_DETAILS_RESET, UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants';
import { getProduct, getProducts, updateProduct } from '../../redux/actions/productActions';

// const categories =[
//     "Laptop",
//     "Footwears",
//     "Bottoms",
//     "Tops",
//     "Attire",
//     "Cameras",
//     "SmartPhones"
//     ];

const UpdateProduct = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();

    const {error,product} =useSelector((state)=>(state.product));
    const {categories} =useSelector((state)=>(state.products));
    const {loading,error:updateError,isUpdated} =useSelector((state)=>(state.updateProduct));

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(updateError){
        toast.error(updateError);
      }else{

        if(product && product._id===id){
            setName(product.name);
            setPrice(product.price);
            setDesc(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);

        }else{
            dispatch(getProduct(id));
        }
        dispatch(getProducts());

        if(isUpdated){
            toast.success("Product updated Successfully");
            dispatch({type:UPDATE_PRODUCT_RESET}); 
            dispatch({type:PRODUCT_DETAILS_RESET}); 
            navigate("/admin/products");
        }
      }
    }, [dispatch,isUpdated,navigate,updateError,id,error,product]);

    const updateProductSubmitFormHandler =(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("name",name);
        myform.set("price",price);
        myform.set("description",desc);
        myform.set("stock",stock);
        myform.set("category",category);

        images.forEach(e => {
            myform.append("images",e);
        });


        dispatch(updateProduct(id,myform));
    }

    const updateProductImagesChange=(e)=>{
        const files=Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

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
        <MetaData title="Update Product"/>
        <div className="dashboard">
            <Sider/>
            <div className="newProductContainer">
                <form className='updateProductForm' onSubmit={updateProductSubmitFormHandler} encType="multipart/form-data">
                    <h1>Update Product</h1>
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
                            value={category}
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
                    
                    <div id="updateProductFile">
                        <input type="file" name="avatar" accept='image/*' className="uploadBtn" multiple onChange={updateProductImagesChange}/>
                    </div>

                    <div className="updateProductImages">
                        {oldImages && oldImages.map((e,i)=>(
                            <img key={i} src={e.url} alt="Product Preview"/>
                        ))}
                    </div>

                    <div className="updateProductImages">
                        {imagesPreview.map((e,i)=>(
                            <img key={i} src={e} alt="Product Preview"/>
                        ))}
                    </div>

                    <Button id="updateProductBtn" type="submit" disabled={loading?true:false}>Update</Button>               
                </form>
            </div>
        </div>
    </Fragment>

  )
}

export default UpdateProduct