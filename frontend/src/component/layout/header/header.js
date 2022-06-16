import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import {FaSearch,FaHouseUser} from "react-icons/fa"
import {FiShoppingBag} from "react-icons/fi"
import logo from "../../../images/ecommerceLogo.png"
import logo2 from "../../../images/ecommerceLogo2.png"

const options={
  burgerColor:"red",
  burgerColorHover:"crimson",
  logo:window.innerWidth>600 ? logo:logo2,
  logoWidth:"20vmax",
  navColor1:"rgb(35,35,35)",
  logoHoverSize:"10px",
  logoHoverColor:"crimson",
  link1Text:"Home",
  link2Text:"Products",
  link3Text:"Contact",
  link4Text:"About",
  link1Url:"/",
  link2Url:"/products",
  link3Url:"/contact",
  link4Url:"/about",
  profileIconUrl:"/login",
  link1Size:"1.5vmax",
  link1Color:"white",
  nav1justifyContent:"flex-end",
  nav2justifyContent:"flex-end",
  nav3justifyContent:"flex-start",
  nav4justifyContent:"flex-start",
  link1ColorHover:"crimson",
  link1Margin:"1vmax",
  profileIconColor:"white",
  searchIconColor:"white",
  cartIconColor:"white",
  profileIconColorHover:"crimson",
  searchIconColorHover:"crimson",
  cartIconColorHover:"crimson",   
  searchIcon:true,
  profileIcon:true,
  cartIcon:true,
  SearchIconElement:FaSearch,
  ProfileIconElement:FaHouseUser,
  CartIconElement:FiShoppingBag,
  cartIconMargin:"1vmax",
  link1Family:"Franklin Gothic Medium",
}

const Header = () => {
  return (
    <ReactNavbar {...options}/>
  )
}

export default Header;