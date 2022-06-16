import { asyncTryCatch } from "../middleware/trycatch.js"
import stripe from "stripe";



export const processPayment=asyncTryCatch(async(req,res,next)=>{
    const myPayment = await stripe(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        },
    });

    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    });
});

export const sendStripeApiKey=asyncTryCatch(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    });
});

