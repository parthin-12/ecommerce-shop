import React, { Fragment } from 'react'
import LocalShippingIcon from "@material-ui/icons/LocalShippingSharp";
import LibraryAddIcon from "@material-ui/icons/LibraryAddCheckSharp";
import AccountBalanceIcon from "@material-ui/icons/AccountBalanceSharp";
import {Stepper,Step,Typography,StepLabel} from "@material-ui/core"
import "./CheckOutSteps.css"

const CheckOutSteps = ({activeStep}) => {

    const steps=[
        {
            labelName:"Shipping Details",
            icon:<LocalShippingIcon/>,
            link:"/shipping"
        },
        {
            labelName:"Confirm Order",
            icon:<LibraryAddIcon/>,
            link:"/order/confirm"
        },
        {
            labelName:"Payment",
            icon:<AccountBalanceIcon/>,
            link:"/order/payment/process"
        },
    ]

  return (
    <Fragment>
        <Stepper
        activeStep={activeStep}
        alternativeLabel 
        style={{boxSizing:"border-box"}}
        >
            {steps.map((e,index)=>(
                <Step key={index} active={activeStep===index?true:false}
                                  completed={index<=activeStep?true:false}  >
                    <StepLabel icon={e.icon} style={{color:index<=activeStep?"tomato":"rgba(0,0,0,0.65)"}}>
                        <Typography>{e.labelName}</Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckOutSteps