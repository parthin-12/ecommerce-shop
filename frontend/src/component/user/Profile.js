import React, { Fragment,useEffect} from 'react'
import { useSelector} from 'react-redux'
import MetaData from '../layout/metaData'
import profileImage from "../../images/profile.png";
import "./Profile.css"
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/loader';

const Profile = () => {

    const{user,loading,isAuth}=useSelector((state)=>(state.user));
    const navigate=useNavigate();

    useEffect(() => {
      if(isAuth===false){
         navigate("/login"); 
      }
    }, [isAuth,navigate])
    

  return (
    <Fragment>
    {loading?<Loader /> :
        <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className="profileContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url==="sampleUrl" ? profileImage:user.avatar.url}
                alt={user.name}/>
                <Link to="update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined At</h4>
                    <p>{String(user.createAt).substring(0,10)}</p>
                </div>

                <div>
                    <Link to="orders">My Orders</Link>
                    <Link to="update/password">Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment>
        }
    </Fragment>
  )
}

export default Profile