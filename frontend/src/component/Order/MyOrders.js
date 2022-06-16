import React, { Fragment, useEffect } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import "./MyOrders.css"
import MetaData from '../layout/metaData'
import LaunchIcon from "@material-ui/icons/LaunchSharp"
import { Typography } from "@material-ui/core"
import Loader from '../layout/loader/loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { myOrders } from '../../redux/actions/orderActions'
import {Link} from "react-router-dom"

const MyOrders = () => {

    const dispatch=useDispatch();
    const {user}=useSelector((state)=>(state.user));
    const {loading,error,orders}=useSelector((state)=>(state.myOrders));

    useEffect(() => {
      if(error){
          return toast.error(error);
      }
      dispatch(myOrders());
    }, [dispatch,error]);

    const columns=[
      {field:"id",headerName:"Order Id",minWidth:300,flex:0.3},
      {field:"status",headerName:"Status",minWidth:150,flex:0.2,cellClassName:(params)=>{
        return(params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor");
      }},
      {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.1},
      {field:"ammount",headerName:"Amount",type:"number",minWidth:270,flex:0.3},
      {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.1,sortable:false,
      renderCell:(params)=>{
        return(
          <Link to={`/account/order/${params.getValue(params.id,"id")}`}>
            <LaunchIcon />
          </Link>
        )
      }}
    ];
    const rows=[];
    orders && orders.forEach(e => {
      rows.push({id:e._id,status:e.orderStatus,itemsQty:e.orderItems.length,ammount:e.totalPrice})
    });
    

  return (
    <Fragment>
        <MetaData title={`${user.name} Orders`} />

        {loading ? <Loader/> :
            <div className="myOrdersPage">
                <DataGrid
                rows={rows}
                columns={columns}
                column
                disableSelectionOnClick
                pageSize={10}
                autoHeight
                className='myOrdersTable'
                />
                <Typography id="myOrdersHeading">{`${user.name}'s Orders`}</Typography>

            </div>
        }

    </Fragment>
  )
}

export default MyOrders