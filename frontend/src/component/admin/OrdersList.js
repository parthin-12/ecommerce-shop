import React, { Fragment, useState } from 'react';
import MetaData from '../layout/metaData';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@material-ui/icons/EditSharp"
import DeleteIcon from "@material-ui/icons/DeleteSharp"
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Sider from './Sider';
import { deleteOrder, getAllOrders } from '../../redux/actions/orderActions';
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants';
import "./OrdersList.css"

const OrdersList = () => {

    const dispatch=useDispatch();
    const {id}=useParams();
    const navigate=useNavigate();
    const dataGridPageSize = 10;

    const {error,orders,loading,countOrders} =useSelector((state)=>(state.allOrders));
    const {error:orderError,isDeleted} =useSelector((state)=>(state.order));
    const [page, setPage] = useState(0);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(orderError){
        toast.error(orderError);
      }
      else{

        if(isDeleted){
            toast.success("Order Deleted Successfully");
            dispatch({type:DELETE_ORDER_RESET});
            navigate("/admin/orders");
        }

      dispatch(getAllOrders(page+1,dataGridPageSize));
      }
    }, [error,dispatch,page,id,orderError,isDeleted,navigate])
    
    const deleteOrderHandler= (deleteOrderId)=>{
        dispatch(deleteOrder(deleteOrderId));
    }

    const columns=[
        {field:"id",headerName:"Order Id",minWidth:300,flex:0.3},
        {field:"status",headerName:"Status",minWidth:150,flex:0.2,cellClassName:(params)=>{
          return(params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor");
        }},
        {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.1},
        {field:"ammount",headerName:"Amount",type:"number",minWidth:270,flex:0.3},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,sortable:false,type:"number",renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                        <EditIcon />
                    </Link>
                    <Button disabled={isDeleted?true:false} onClick={()=>(deleteOrderHandler(params.getValue(params.id,"id")))}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            )
        }},
    ]

    const rows=[];

    orders && orders.forEach(e => {
      rows.push({id:e._id,status:e.orderStatus,itemsQty:e.orderItems.length,ammount:e.totalPrice})
    });

  return (
    <Fragment>
        <MetaData title="All Orders" />
        <div className="dashboard">
            <Sider />
            <div className="ordersListContainer">
                <h1 className="ordersListHeading">All Orders</h1>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSize={dataGridPageSize}
                    disableSelectionOnClick
                    className='ordersListTable'
                    autoHeight
                    page={page}
                    onPageChange={(newPage)=>setPage(newPage)}
                    rowsPerPageOptions={[dataGridPageSize]}
                    paginationMode="server"
                    rowCount={countOrders}
                />
            </div>
        </div>
    </Fragment>
  )
}

export default OrdersList