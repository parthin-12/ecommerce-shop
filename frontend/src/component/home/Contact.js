import React, { Fragment } from 'react'
import "./Contact.css"
import MetaData from '../layout/metaData'


const Contact = () => {
  return (
    <Fragment>
        <MetaData title="Contact" />
        <div className="contactContainer">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=parthinbariya003@gmail.com" target="_blank" rel="noopener noreferrer"><span>Gmail: </span>parthinbariya003@gmail.com</a>
        </div>
    </Fragment>
  )
}

export default Contact