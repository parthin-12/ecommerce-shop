import React, { Fragment } from 'react'
import "./AboutUs.css"
import MetaData from '../layout/metaData'
import myImg from "./../../images/profile.png"
import { Button } from '@material-ui/core'

const AboutUs = () => {
  return (
    <Fragment>
        <MetaData title="About Us" />
        <div className="aboutUsContainer">
            <div className="aboutUsBox">
                <h1>About Us</h1>
                <img src={myImg} alt="myImage" />
                <p>Parthin Baraiya<p>(DAIICT-ID:201901113)</p></p>
                <Button color='primary'><a id='instagramBtn'  href="https://www.instagram.com/parthinbariya/" target="_blank" rel="noopener noreferrer">VISIT INSTAGRAM</a></Button>
                <span>Welcome to My Website! My name is parthin baraiya and I study at Daiict College.This website was created only for the purpose of self-education.<br/><br/>Hope You Enjoyed this website</span>
            </div>
        </div>
    </Fragment>
  )
}

export default AboutUs