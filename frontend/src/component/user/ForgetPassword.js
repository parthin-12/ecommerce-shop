import React, { Fragment, useEffect,useState} from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { forgetPassword } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify"
import Loader from '../layout/loader/loader';
import MetaData from '../layout/metaData';
import { clearErrors } from '../../redux/actions/productActions';
import"./ForgetPassword.css"

const ForgetPassword = () => {

    const dispatch=useDispatch();

    const {message,loading,error}= useSelector((state)=>(state.forgetPassword));

    const [email, setEmail] = useState("");

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(message){
            toast.success(message);
        }
    }, [dispatch,error,message])

    const forgetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myform = new FormData();
        myform.set("email",email);

        dispatch(forgetPassword(myform));
    }

  return (
    <Fragment>
    {loading?<Loader />:
    <Fragment>
        <MetaData title="Forget Password" />
    <div className="forgetPasswordContainer">
        <div className="forgetPasswordBox">
            <div className="forgetPasswordHeading">Forget Password</div>
                <form className='forgetPasswordForm'onSubmit={forgetPasswordSubmit}>
                        <div className="emial">
                            <MailOutlineIcon />
                            <input 
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            name="email"
                            onChange={(e)=>setEmail(e.currentTarget.value)} 
                            />
                        </div>
                        <input type="submit" value="Update" className='forgetPasswordBtn' />   
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default ForgetPassword