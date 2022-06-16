import React, { Fragment, useState } from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/DashboardSharp";
import LogoutIcon from "@material-ui/icons/ExitToAppSharp";
import ProfileIcon from "@material-ui/icons/PersonSharp";
import OrdersIcon from "@material-ui/icons/ListAltSharp";
import CartIcon from "@material-ui/icons/ShoppingCartSharp";
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/actions/userActions';
import {toast} from "react-toastify";
import { clearErrors } from '../../../redux/actions/productActions';
import profileImage from "../../../images/profile.png";
import "./UserOptions.css";

const UserOptions = () => {
    
    const [open, setOpen] = useState(false);
    const{user,error}=useSelector((state)=>(state.user));
    const{cartItems}=useSelector((state)=>(state.cart));
    const dispatch=useDispatch();
    
    const options = [
        {icon:<ProfileIcon />,title:"Profile",link:"/account"},
        {icon:<OrdersIcon />,title:"Orders",link:"/account/orders"},
        {icon:<CartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>,title:`Cart(${cartItems.length})`,link:"/cart"},
        {icon:<LogoutIcon />,title:"Logout",link:"/logout"},
    ]
    const navigate=useNavigate();

    if(user && (user.role==="admin" || user.role==="master")){
        options.unshift({icon:<DashboardIcon />,title:"Dashboard",link:"/admin/dashboard"});
    }

    const func =(link) =>{
        if(link==="/logout"){
            dispatch(logoutUser());
            if(error){
                toast.error(error);
                dispatch(clearErrors());
            }
            toast.success("Logout Successfully");
        }else{
            navigate(link)
        }
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
            className='speedDail'
            ariaLabel='SpeedDail tooltip example'
            style={{zIndex:"11"}}
            open={open}
            onOpen={()=>setOpen(true)}
            onClose={()=>setOpen(false)}
            icon={<img
                className='speedDailImage'
                src={user.avatar.url==="sampleUrl" ?profileImage:user.avatar.url }
                alt="Profile"
                />
            }
            direction="down"
        >
            {options.map((e)=>(
                <SpeedDialAction
                key={e.title}
                icon={e.icon}
                tooltipTitle={e.title}
                onClick={()=>func(e.link)}
                tooltipOpen={window.innerWidth<=600?true:false}
                />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions