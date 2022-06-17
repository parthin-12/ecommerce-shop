import './App.css';
import Header from "./component/layout/header/header.js";
import Footer from "./component/layout/footer/footer.js"
import PageNotFound from "./component/layout/PageNotFound/PageNotFound.js"
import { BrowserRouter  as Router,Navigate} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import webfontloader from "webfontloader";
import React, { useEffect, useState } from 'react';
import Home from "./component/home/home.js"
import Contact from "./component/home/Contact.js"
import AboutUs from "./component/home/AboutUs.js"
import ProductDetails from "./component/product/ProductDetails.js";
import AllProducts from "./component/product/AllProducts.js";
import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/ConfirmOrder.js";
import PaymentOrder from "./component/cart/PaymentOrder.js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import Search from "./component/product/Search.js";
import LoginRegister from './component/user/LoginRegister';
import UpdateProfile from './component/user/UpdateProfile.js';
import UpdatePassword from './component/user/UpdatePassword.js';
import ForgetPassword from './component/user/ForgetPassword.js';
import ResetPassword from './component/user/ResetPassword.js';
import Profile from './component/user/Profile.js';
import store from "./redux/store.js";
import { loadUser} from './redux/actions/userActions';
import UserOptions from "./component/layout/header/UserOptions.js";
import { useSelector } from 'react-redux';
import Loader from './component/layout/loader/loader';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js"
import ProductsList from "./component/admin/ProductsList.js"
import NewProduct from "./component/admin/NewProduct.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrdersList from "./component/admin/OrdersList.js"
import ProcessOrders from "./component/admin/ProcessOrders.js"
import UsersList from './component/admin/UsersList.js';
import UpdateUser from './component/admin/UpdateUser.js';
import ProductReviews from './component/admin/ProductReviews.js';
import CreateProducts from './component/admin/CreateProducts.js';
import CreateCategories from './component/admin/CreateCategories.js';
import UpdateCategories from './component/admin/UpdateCategories.js';

function App() {

  const {isAuth,user,loading}=useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeApikey");
    setStripeApiKey(data.stripeApiKey);
  }

    useEffect(()=>{
      webfontloader.load({
        google:{
          families:["Roboto","Droid Sans","Chilanka","Franklin Gothic Medium"]
        }
      });

      store.dispatch(loadUser());
      getStripeApiKey();
    },[]);

    window.addEventListener("contextmenu",(e)=>(e.preventDefault()));

    return ( 
  <Router>
    <Header />
    {isAuth && <UserOptions user={user}/>}
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/product/:id" element={<ProductDetails/>} />
      <Route exact path="/products" element={<AllProducts/>} />
      <Route exact path="/contact" element={<Contact/>} />
      <Route exact path="/about" element={<AboutUs/>} />
      <Route exact path="/products/:keyword" element={<AllProducts/>} />
      <Route exact path="/search" element={<Search/>} />
      <Route exact path="/login" element={<LoginRegister/>} />
      <Route exact path="/account" element={isAuth?<Profile/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/account/update" element={isAuth?<UpdateProfile/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/account/update/password" element={isAuth?<UpdatePassword/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/password/forget" element={<ForgetPassword />} />
      <Route exact path="/password/reset/:token" element={<ResetPassword />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/account/order/:id" element={isAuth?<OrderDetails/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/shipping" element={isAuth?<Shipping/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
    {stripeApiKey && 
        <Route exact path="/order/payment/process" element={isAuth?<Elements stripe={loadStripe(stripeApiKey)}>
          <PaymentOrder/>
          </Elements>
          :
          (loading===false?<Navigate to="/login"/>:<Loader/>)} />
        }

      <Route exact path="/order/payment/done" element={isAuth?<OrderSuccess/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/account/orders" element={isAuth?<MyOrders/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
        
      <Route exact path="/order/confirm" element={isAuth?<ConfirmOrder/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />

      <Route exact path="/admin/dashboard" element={(isAuth && (user.role==="admin" || user.role==="master"))?<Dashboard/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/products" element={(isAuth && (user.role==="admin" || user.role==="master"))?<ProductsList/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/product" element={(isAuth && (user.role==="admin" || user.role==="master"))?<NewProduct/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/product/:id" element={(isAuth && (user.role==="admin" || user.role==="master"))?<UpdateProduct/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/orders" element={(isAuth && (user.role==="admin" || user.role==="master"))?<OrdersList/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/order/:id" element={(isAuth && (user.role==="admin" || user.role==="master"))?<ProcessOrders/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/users" element={(isAuth && (user.role==="admin" || user.role==="master"))?<UsersList/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/user/:id" element={(isAuth && (user.role==="admin" || user.role==="master"))?<UpdateUser/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/reviews" element={(isAuth && (user.role==="admin" || user.role==="master"))?<ProductReviews/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/api/create" element={(isAuth && (user.role==="admin" || user.role==="master"))?<CreateProducts/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/category/create" element={(isAuth && (user.role==="admin" || user.role==="master"))?<CreateCategories/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route exact path="/admin/category/update" element={(isAuth && (user.role==="admin" || user.role==="master"))?<UpdateCategories/>:(loading===false?<Navigate to="/login"/>:<Loader/>)} />
      <Route path="*" element={<PageNotFound/>}/>  
    </Routes> 
    <Footer />
  </Router>
  );
}

export default App;
