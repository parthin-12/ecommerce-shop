import React, { Fragment, useEffect, useRef ,useState} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./LoginRegister.css";
import Profile from "../../images/profile.png"
import { loginUser, registerUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify"
import Loader from '../layout/loader/loader';
import { clearErrors } from '../../redux/actions/productActions';

const LoginRegister = () => {

    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null); 
    
    const location=useLocation();


    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("moveToNetural");
            switcherTab.current.classList.remove("moveToRight");

            registerTab.current.classList.remove("moveToNeturalForm");
            loginTab.current.classList.remove("moveToLeft");
        }
        if(tab==="register"){
            switcherTab.current.classList.add("moveToRight");
            switcherTab.current.classList.remove("moveToNetural");

            registerTab.current.classList.add("moveToNeturalForm");
            loginTab.current.classList.add("moveToLeft");
        }
    };

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [sendUser, setSendUser] = useState({
        name:"",
        email:"",
        password:""
    });

    const {name,email,password}=sendUser;

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(Profile);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const{error,user,isAuth,loading}=useSelector((state)=>(state.user));

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isAuth){
            navigate(location.search?location.search.split("=")[1]:"/account");
        }
        
    }, [dispatch,error,isAuth,navigate])
    
    
    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser({"email":loginEmail,"password":loginPassword}));
    }

    const registerSubmit=(e)=>{
        e.preventDefault();

        const myform = new FormData();

        myform.set("name",name);
        myform.set("email",email);
        myform.set("password",password);
        myform.set("avatar",avatar);

        dispatch(registerUser(myform));
    }

    const registerDataChange = (e)=>{

        if(e.target.name==='avatar'){
            const reader =new  FileReader();

            reader.onload = () => {
                if(reader.readyState===2){
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        else{
            setSendUser({...sendUser,[e.target.name]:e.target.value})
        }

    };


  return (
    <Fragment>
        {(loading || isAuth===true)?<Loader/>:
            <Fragment>
            <div className="loginRegisterContainer">
                <div className="loginRegisterBox">
                    <div className="loginRegisterToggle">
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input 
                            type="email"
                            placeholder='Email'
                            required
                            value={loginEmail}
                            name="email"
                            onChange={(e)=>setLoginEmail(e.currentTarget.value)} 
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input 
                            type="password"
                            placeholder='Password'
                            required
                            value={loginPassword}
                            name="password"
                            onChange={(e)=>setLoginPassword(e.currentTarget.value)} 
                            />
                        </div>
                        <Link to="/password/forget">Forget Password?</Link>
                        <input type="submit" value="Login" className='loginBtn'/>
                    </form>
                    <form className='registerForm' ref={registerTab} onSubmit={registerSubmit} encType="multipart/form-data">
                    <div className="registerName">
                            <FaceIcon />
                            <input 
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            name="name"
                            onChange={registerDataChange} 
                            />
                        </div>
                        <div className="registerEmail">
                            <MailOutlineIcon />
                            <input 
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            name="email"
                            onChange={registerDataChange} 
                            />
                        </div>
                        <div className="registerPassword">
                            <LockOpenIcon />
                            <input 
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            name="password"
                            onChange={registerDataChange} 
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview"/>
                            <input type="file" name="avatar" accept='image/*' onChange={registerDataChange} className="uploadBtn"/>
                        </div>
                        <input type="submit" value="Register" className='registerBtn' />
                        
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>

  )
}

export default LoginRegister