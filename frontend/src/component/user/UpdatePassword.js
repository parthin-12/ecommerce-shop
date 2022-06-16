import React, { Fragment, useEffect,useState} from 'react';
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import KeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import "./UpdatePassword.css"
import { loadUser, resetUpdatePassword, updatePassword } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { clearErrors } from '../../redux/actions/productActions';
import Loader from '../layout/loader/loader';


const UpdatePassword = () => {

    const dispatch =useDispatch();
    const navigate =useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {isUpdated,loading,error}=useSelector((state)=>(state.profile));

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            toast.success("Password Updated Successfully");
            dispatch(resetUpdatePassword());
            dispatch(loadUser());
            navigate("/account");
        }
    }, [dispatch,navigate,error,isUpdated])

    const updatePasswordSubmit=(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("oldPassword",oldPassword);
        myform.set("password",newPassword);
        myform.set("confirmPassword",confirmPassword);

        dispatch(updatePassword(myform));
    }


  return (
    <Fragment>
        {loading?<Loader />:
        <Fragment>
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                <div className="updatePasswordHeading">Update Password</div>
                    <form className='updatePasswordForm'onSubmit={updatePasswordSubmit}>
                            <div className="oldPassword">
                                <KeyIcon />
                                <input 
                                type="password"
                                placeholder='Old Password'
                                required
                                value={oldPassword}
                                name="password"
                                onChange={(e)=>setOldPassword(e.currentTarget.value)} 
                                />
                            </div>
                            <div className="newPassword">
                                <LockOpenIcon />
                                <input 
                                type="password"
                                placeholder='New Password'
                                required
                                value={newPassword}
                                name="password"
                                onChange={(e)=>setNewPassword(e.currentTarget.value)} 
                                />
                            </div>
                            <div className="confirmPassword">
                                <LockIcon />
                                <input 
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                name="password"
                                onChange={(e)=>setConfirmPassword(e.currentTarget.value)} 
                                />
                            </div>
                            <input type="submit" value="Update" className='updatePasswordBtn' />   
                        </form>
                    </div>
                </div>
    </Fragment>
        }
    </Fragment>
  )
}

export default UpdatePassword