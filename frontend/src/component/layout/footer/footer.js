import React from 'react'
import playStore from "../../../images/PlayStore.png";
import appStore from "../../../images/AppStore.png";
import "./footer.css"

const yearDate =new Date().getFullYear();

const footer = () => {
    return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile Phone</p>
            <img src={playStore} alt="PlayStore"></img>
            <img src={appStore} alt="AppStore"></img>
        </div>
        <div className='midFooter'>
            <h1>ECOMMERCE</h1>
            <p>Customer Satisfaction is our top priority</p>
            <p>Copyrights 2021-{yearDate} &copy; Parthin Baraiya</p>
        </div>
        <div className='rightFooter'>
            <h4>Follow me</h4>
            <a href="https://www.instagram.com/parthinbariya">Instagram</a>   
        </div>
    </footer>
  )
}

export default footer;