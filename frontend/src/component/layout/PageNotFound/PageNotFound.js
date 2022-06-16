import React from 'react'
import {RiErrorWarningFill} from "react-icons/ri";
import { Link } from 'react-router-dom';
import "./PageNotFound.css"

const PageNotFound = () => {

    const warningIconOptions={
        size:130,
        color:"tomato"
    }

  return (
    <div className='PageNotFoundBox'> 
        <RiErrorWarningFill className='warningIcon' {...warningIconOptions}/>  
        <h1 className="PageNotFound">Page Not Found</h1>
        <Link to="/">Home</Link>
    </div>
  )
}

export default PageNotFound