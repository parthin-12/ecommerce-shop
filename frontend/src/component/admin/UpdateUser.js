import React, { Fragment } from 'react'
import "./UpdateUser.css"
import MetaData from '../layout/metaData'
import MailOutlineSharpIcon from "@material-ui/icons/MailOutlineSharp";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import VerifiedUserSharpIcon from "@material-ui/icons/VerifiedUserSharp";
import Sider from './Sider';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../redux/actions/userActions';
import { UPDATE_USER_RESET, USER_DETAILS_RESET } from '../../redux/constants/userConstants';
import { getUser } from '../../redux/actions/userActions';
import Loader from '../layout/loader/loader';


const UpdateUser = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id} =useParams();

    const {loading:updateLoading,error:updateError,isUpdated} =useSelector((state)=>(state.profile));
    const {loading,error,user} =useSelector((state)=>(state.getUser));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(updateError){
            toast.error(updateError);
      }else{

          if(user && user._id===id){
              setName(user.name);
              setEmail(user.email);
              setRole(user.role);
            }else{
                dispatch(getUser(id));
            }
          
            if(isUpdated){
               toast.success("User Updated Successfully");
               dispatch({type:UPDATE_USER_RESET}); 
               dispatch({type:USER_DETAILS_RESET}); 
               navigate("/admin/users");
           }
        }
    }, [dispatch,isUpdated,navigate,error,updateError,id,user]);

    const updateUserSubmitFormHandler =(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("name",name);
        myform.set("email",email);
        myform.set("role",role);

        dispatch(updateUser(id,myform));
    }

    

  return (
    <Fragment>
        <MetaData title="Update User"/>
        <div className="dashboard">
            <Sider/>
            <div className="newUserContainer">
            {loading ? <Loader/> :
                <form className='updateUserForm' onSubmit={updateUserSubmitFormHandler}>
                    <h1>Update User</h1>
                    <div>
                        <PersonSharpIcon />
                        <input 
                        type="text"
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(e)=>(setName(e.target.value))} 
                        />
                    </div>
                    <div>
                        <MailOutlineSharpIcon />
                        <input 
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e)=>(setEmail(e.target.value))} 
                        />
                    </div>
                    <div>
                        <VerifiedUserSharpIcon />
                        <select
                            onChange={(e)=>(setRole(e.target.value))}
                            value={role}
                        >
                            <option value="">Choose Role</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>
                
                    <Button id="updateUserBtn" type="submit" disabled={(updateLoading || role==="")?true:false}>Update</Button>               
                </form>}
            </div>
        </div>
    </Fragment>

  )
}


export default UpdateUser