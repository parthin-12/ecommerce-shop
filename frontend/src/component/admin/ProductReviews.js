import React, { Fragment, useState } from 'react';
import "./ProductsReviews.css"
import MetaData from '../layout/metaData';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import StarSharpIcon from "@material-ui/icons/StarSharp"
import DeleteIcon from "@material-ui/icons/DeleteSharp"
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {deleteProductReview, productReviews } from '../../redux/actions/productActions';
import Sider from './Sider';
import { DELETE_REVIEW_RESET } from '../../redux/constants/productConstants';

const ProductReviews = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const dataGridPageSize = 10;

    const {error,reviews,loading} =useSelector((state)=>(state.getProductReviews));
    const {error:deleteError,isDeleted} =useSelector((state)=>(state.deleteReview));
    const [productId, setProductId] = useState("");

    useEffect(() => {
    if(productId.length===24){
        dispatch(productReviews(productId));     
      if(error){
        toast.error(error);
      }else if(deleteError){
        toast.error(deleteError);
      }
      else{
        if(isDeleted){
            toast.success("Review Deleted Successfully");
            dispatch({type:DELETE_REVIEW_RESET});
            navigate("/admin/reviews");
        }
      }
    }
    }, [error,dispatch,deleteError,isDeleted,navigate,productId])
    
    const deleteReviewHandler= (reviewId)=>{
        dispatch(deleteProductReview(productId,reviewId));
    }

    const columns=[
        {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
        {field:"user",headerName:"User",minWidth:150,flex:0.6},
        {field:"comment",headerName:"Comment",minWidth:350,flex:1},
        {field:"rating",headerName:"Rating",minWidth:180,flex:0.4,type:"number",cellClassName:(params)=>{
            return(params.getValue(params.id,"rating")>=3?"greenColor":"redColor");
          }},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,sortable:false,type:"number",renderCell:(params)=>{
            return(
                <Fragment>
                    <Button disabled={isDeleted?true:false} onClick={()=>(deleteReviewHandler(params.getValue(params.id,"id")))}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows=[];

    reviews && reviews.forEach(e => {
        rows.push({id:e._id,user:e.name,rating:e.rating,comment:e.comment})
    });

    const reviewSubmitFormHandler=(e)=>{
        e.preventDefault();
        dispatch(productReviews(productId));

    }

  return (
    <Fragment>
        <MetaData title="All Reviews" />
        <div className="dashboard">
            <Sider />
            <div className="productReviewsContainer">
                <form className='productReviewsForm' onSubmit={reviewSubmitFormHandler}>
                    <h1 className='productReviewsFormHeading'>Update User</h1>
                    <div>
                        <StarSharpIcon />
                        <input 
                        type="text"
                        placeholder='ProductId'
                        required
                        value={productId}
                        onChange={(e)=>(setProductId(e.target.value))} 
                        />
                    </div>               
                    <Button id="productReviewsBtn" type="submit" disabled={(loading || productId==="")?true:false}>Search</Button>               
                </form>
                {reviews && reviews.length>0 ?
                    <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={dataGridPageSize}
                    disableSelectionOnClick
                    className='productReviewsTable'
                    autoHeight
                    rowsPerPageOptions={[dataGridPageSize]}
                    paginationMode="server"
                />:
                (<h1 className='productReviewsFormHeading'>No Reviews Found</h1>)
                }
            </div>
        </div>
    </Fragment>
  )
}


export default ProductReviews