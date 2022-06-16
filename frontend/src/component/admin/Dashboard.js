import React, { Fragment, useEffect } from 'react'
import Slider from "./Sider.js"
import MetaData from '../layout/metaData'
import "./Dashboard.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProducts } from '../../redux/actions/productActions.js'
import Loader from '../layout/loader/loader.js'
import { getAllOrders } from '../../redux/actions/orderActions.js'
import { getAllUsers } from '../../redux/actions/userActions.js'

ChartJS.register(...registerables);

const Dashboard = () => {

    const dispatch =useDispatch();

    const {loading,error,countProducts,outOfStock}= useSelector((state)=>(state.products));
    const {loading:userLoading,error:userError,countUsers}= useSelector((state)=>(state.allUsers));
    const {loading:orderLoading,error:orderError,countOrders,totalOrdersSum,totalAmounts}= useSelector((state)=>(state.allOrders));

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(orderError){
        toast.error(orderError);
      }else if(userError){
        toast.error(userError);
      }else{
        dispatch(getProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }
    }, [dispatch,error,orderError,userError])
    
    const data=[];
    const labels=[];

    totalAmounts && totalAmounts.forEach(e => {
        var date=new Date(e.day);
        labels.push(String(date).substring(0,10));
        data.push(e.totalAmount);
    });

    const lineChartData={
        labels:labels,
        datasets:[{
            label:"Amount Earned",
            backgroundColor:["tomato"],
            hoverBackgroundColor:["rgb(209, 31, 0)"],
            data:data
        }]
    }

    const doughnutChartData= {

            labels:["Out Of Stock","In Stock"],
            datasets:[{
                backgroundColor:["#008684","#680084"],
                hoverBackgroundColor:["#485000","#35014f"],
                data:[outOfStock,countProducts-outOfStock]
            }]
        }

  return (
    <Fragment>
    {(loading || orderLoading || userLoading) ? <Loader/>:
     <div className="dashboard">
         <MetaData title="Dashboard" />
            <Slider />
        <div className="dashboardContainer">
            <Typography component="h1">
                Dashboard
            </Typography>
            <div className="dashboardSummary">
                <div>
                    <p>
                        Total Amount <br/> ₹{totalOrdersSum}
                    </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Products</p>
                        <p>{countProducts}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{countOrders}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{countUsers}</p>
                    </Link>
                </div>
            </div>

            <div className="lineChart">
                <h1>Amount Earned in Last 30 Days</h1>
                <Line 
                data={lineChartData}

                />
            </div>

            <div className="doughnutChart">
                <h1>Products Stock</h1>
                <Doughnut data={doughnutChartData}/>
            </div>

        </div>
     </div>
  }</Fragment>
  )
}

export default Dashboard