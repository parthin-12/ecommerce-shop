import React, { Fragment, useEffect,useState} from 'react';
import {useNavigate } from 'react-router-dom';
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./UpdateProfile.css";
import Profile from "../../images/profile.png"
import { updateProfile ,resetUpdateProfile, loadUser} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify"
import Loader from '../layout/loader/loader';
import { clearErrors } from '../../redux/actions/productActions';

const UpdateProfile = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {isUpdated,loading,error}= useSelector((state)=>(state.profile));
    const {user}= useSelector((state)=>(state.user));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            toast.success("Updated Successfully");
            dispatch(resetUpdateProfile());
            dispatch(loadUser());
            navigate("/account");
        }

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url==="sampleUrl"?Profile:user.avatar.url)
        }
    }, [dispatch,navigate,error,isUpdated,user])
    

    const updateProfileDataChange=(e)=>{
        const reader =new  FileReader();

        reader.onload = () => {
            if(reader.readyState===2){
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const updateProfileSubmit=(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("name",name);
        myform.set("email",email);
        myform.set("avatar",avatar);

        dispatch(updateProfile(myform));
    }

  return (
    <Fragment>
        {loading ? <Loader/> :
        <Fragment>
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <div className="updateProfileHeading">Profile</div>
                <form className='updateProfileForm'onSubmit={updateProfileSubmit} encType="multipart/form-data">
                    <div className="updateProfileName">
                        <FaceIcon />
                        <input 
                        type="text"
                        placeholder='Name'
                        required
                        value={name}
                        name="name"
                        onChange={(e)=>setName(e.target.value)} 
                        />
                    </div>
                    <div className="updateProfileEmail">
                        <MailOutlineIcon />
                        <input 
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)} 
                        />
                    </div>
                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview"/>
                        <input type="file" name="avatar" accept='image/*' onChange={updateProfileDataChange} className="uploadBtn"/>
                    </div>
                    <input type="submit" value="Update" className='updateProfileBtn' />      
                </form>
            </div>
        </div>
    </Fragment>
        }
    </Fragment>
  )
}

export default UpdateProfile