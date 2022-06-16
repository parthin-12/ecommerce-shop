import React, { Fragment, useState } from 'react'
import "./shipping.css"
import{Country,State} from "country-state-city"
import {toast} from "react-toastify"
import HomeIcon from "@material-ui/icons/HomeSharp"
import LocationCityIcon from "@material-ui/icons/LocationCitySharp"
import PinDropIcon from "@material-ui/icons/PinDropSharp"
import PublicIcon from "@material-ui/icons/PublicSharp"
import PhoneIcon from "@material-ui/icons/PhoneSharp"
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStationSharp"
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/metaData';
import CheckOutSteps from "./CheckOutSteps.js"
import { useNavigate } from 'react-router-dom'
import { shippingInfoAction } from '../../redux/actions/cartActions'

const Shipping = () => {

    const{data}=useSelector((state)=>(state.cart.shippingInfo));
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [address, setAddress] = useState(data?data.address:"");
    const [city, setCity] = useState(data?data.city:"");
    const [state, setState] = useState(data?data.state:"");
    const [country, setCountry] = useState(data?data.country:"");
    const [pincode, setPincode] = useState(data?data.pincode:"");
    const [phoneNo, setPhoneNo] = useState(data?data.phoneNo:"");

    const shippingSubmit=(e)=>{
        e.preventDefault();
        console.log(phoneNo);
        if(phoneNo.length!==10){
            toast.error("Phone Number should be 10 digits");
            return;
        }
        dispatch(shippingInfoAction({address,city,state,country,pincode,phoneNo}));
        navigate("/order/confirm");
    }


  return (
    <Fragment>  
<MetaData title="Shipping Details"/>
        <CheckOutSteps activeStep={0}/>
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>
                <form className="shippingForm" onSubmit={shippingSubmit}>
                    <div>
                        <HomeIcon />
                        <input 
                        type="text"
                        placeholder='Address'
                        required
                        value={address}
                        onChange={(e)=>(setAddress(e.target.value))} 
                        />
                    </div>
                    <div>
                        <LocationCityIcon />
                        <input 
                        type="text"
                        placeholder='city'
                        required
                        value={city}
                        onChange={(e)=>(setCity(e.target.value))} 
                        />
                    </div>
                    <div>
                        <PinDropIcon />
                        <input 
                        type="number"
                        placeholder='pincode'
                        required
                        value={pincode}
                        onChange={(e)=>(setPincode(e.target.value))} 
                        />
                    </div>
                    <div>
                        <PhoneIcon />
                        <input 
                        type="number"
                        placeholder='phoneNo'
                        required
                        value={phoneNo}
                        onChange={(e)=>(setPhoneNo(e.target.value))}
                        onInput={(e)=>(e.currentTarget.value=e.currentTarget.value.slice(0, 10))}
                        />
                    </div>
                    <div>
                        <PublicIcon />
                        <select
                            required
                            value={country}
                            onChange={(e)=>(setCountry(e.target.value))}
                        >
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((e)=>(
                                <option value={e.isoCode} key={e.isoCode}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    { country && 
                    <div>
                            <TransferWithinAStationIcon />
                            <select
                                required
                                value={state}
                                onChange={(e)=>(setState(e.target.value))}
                            >
                                <option value="">State</option>
                                {State && State.getStatesOfCountry(country).map((e)=>(
                                    <option value={e.isoCode} key={e.isoCode}>{e.name}</option>
                                    ))}
                            </select>
                        </div>
                    }
                    <input type="submit" value="Continue" className='shippingBtn' disabled={state?false:true}/>   
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping