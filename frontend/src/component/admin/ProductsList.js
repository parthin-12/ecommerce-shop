import React, { Fragment, useState } from 'react';
import "./ProductsList.css"
import MetaData from '../layout/metaData';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@material-ui/icons/EditSharp"
import DeleteIcon from "@material-ui/icons/DeleteSharp"
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProducts,deleteProduct } from '../../redux/actions/productActions';
import Sider from './Sider';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants';

const ProductsList = () => {

    const dispatch=useDispatch();
    const {id}=useParams();
    const navigate=useNavigate();
    const dataGridPageSize = 10;

    const {error,products,loading,countProducts,maxProductPrice} =useSelector((state)=>(state.products));
    const {error:deleteError,isDeleted} =useSelector((state)=>(state.deleteProduct));
    const [page, setPage] = useState(0);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(deleteError){
        toast.error(deleteError);
      }
      else{

        if(isDeleted){
            toast.success("Product Deleted Successfully");
            dispatch({type:DELETE_PRODUCT_RESET});
            navigate("/admin/products");
        }

      dispatch(getProducts(page+1,"",[0,50000],null,0,dataGridPageSize));
      }
    }, [error,dispatch,page,id,deleteError,isDeleted,navigate])
    
    const deleteProductHandler= (deleteProductId)=>{
        dispatch(deleteProduct(deleteProductId));
    }

    const columns=[
        {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
        {field:"name",headerName:"Name",minWidth:350,flex:1},
        {field:"stock",headerName:"Stock",minWidth:150,flex:0.3,type:"number"},
        {field:"price",headerName:"Price",minWidth:270,flex:0.5,type:"number"},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,sortable:false,type:"number",renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                        <EditIcon />
                    </Link>
                    <Button disabled={isDeleted?true:false} onClick={()=>(deleteProductHandler(params.getValue(params.id,"id")))}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows=[];

    products && products.forEach(e => {
        rows.push({id:e._id,name:e.name,stock:e.stock,price:e.price})
    });

  return (
    <Fragment>
        <MetaData title="All Products" />
        <div className="dashboard">
            <Sider />
            <div className="productsListContainer">
                <h1 className="productsListHeading">All Products</h1>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSize={dataGridPageSize}
                    disableSelectionOnClick
                    className='productsListTable'
                    autoHeight
                    page={page}
                    onPageChange={(newPage)=>setPage(newPage)}
                    rowsPerPageOptions={[dataGridPageSize]}
                    paginationMode="server"
                    rowCount={countProducts}
                />
            </div>
        </div>
    </Fragment>
  )
}

export default ProductsList