import React, { Fragment, useEffect,useState} from 'react';
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import LockIcon from "@material-ui/icons/Lock";
import { resetPassword } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import { clearErrors } from '../../redux/actions/productActions';
import Loader from '../layout/loader/loader';
import "./ResetPassword.css";

const ResetPassword = () => {
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const {token} =useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {success,loading,error}=useSelector((state)=>(state.forgetPassword));

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(success){
            toast.success("Password Reset Successfully");
            navigate("/login");
        }
    }, [dispatch,navigate,error,success])

    const resetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("password",newPassword);
        myform.set("confirmPassword",confirmPassword);

        dispatch(resetPassword(token,myform));
    }


  return (
    <Fragment>
        {loading?<Loader />:
        <Fragment>
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <div className="resetPasswordHeading">Update Password</div>
                    <form className='resetPasswordForm'onSubmit={resetPasswordSubmit}>
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
                            <input type="submit" value="Update" className='resetPasswordBtn' />   
                        </form>
                    </div>
                </div>
    </Fragment>
        }
    </Fragment>
  )
}

export default ResetPassword