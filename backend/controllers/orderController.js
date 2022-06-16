import orderSchema from "../models/orderModel.js";
import productSchema from "../models/productModel.js";
import varaiblesSchema from "../models/varaiblesModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import { asyncTryCatch } from "../middleware/trycatch.js"
import ApiFeatures from "../utils/apiFeatures.js";
import varaiblesModel from "../models/varaiblesModel.js";

// create a new order

export const createNewOrder = asyncTryCatch(async (req, res, next) => {

    const{shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    
    const order = await orderSchema.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id 
    })

/// totalammount added in varables Schema

    const variables = await varaiblesModel.findOne();
        variables.totalAmount=variables.totalAmount+totalPrice;
        const totalAmounts=variables.totalAmounts;
        const totalAmountLength=totalAmounts.length;

        if(totalAmountLength!==0){
            var sendDate=new Date(totalAmounts[totalAmountLength-1].day);
            var nowDate=new Date(Date.now());


            if(String(sendDate).substring(0,10)===String(nowDate).substring(0,10)){
                totalAmounts[totalAmountLength-1].totalAmount=totalAmounts[totalAmountLength-1].totalAmount+totalPrice;
            }else{
                if(totalAmountLength===30){
                    totalAmounts=totalAmounts.unshift();
                }
                totalAmounts.push({totalAmount:totalPrice,day:Date.now()});
            }
        }else{
            totalAmounts.push({totalAmount:totalPrice,day:Date.now()});
        }

        variables.totalAmounts=totalAmounts;

        await variables.save({validateBeforeSave:false});


    res.status(201).json({
        success:true,
        order
    });

});


/// get single order

export const getSingleOrder = asyncTryCatch(async (req, res, next) => {

    const order = await orderSchema.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler(`Order not found with this id:${req.params.id}`,404));
    }

    return res.status(200).json({
        success:true,
        order
    });

});

/// get user (login user) orders

export const myOrders = asyncTryCatch(async (req, res, next) => {

    const orders = await orderSchema.find({user:req.user._id});

    return res.status(200).json({
        success:true,
        orders
    });

});

/// get all orders in server (admin)

export const getAllOrders = asyncTryCatch(async (req, res, next) => {

    const ordersPerPage = Number(req.query.pageSize);

    let apiFeature = new ApiFeatures(orderSchema.find(), req.query).search().filter();
    let orders = await apiFeature.query;

    const countOrders=orders.length;

    apiFeature = new ApiFeatures(orderSchema.find(), req.query).search().filter().pagination(ordersPerPage);
    orders = await apiFeature.query;


    // const orders = await orderSchema.find();
    
    ///get totalOrderSum
    
    let totalOrdersSum=0;
    let totalAmounts=[];
    const varaibles = await varaiblesModel.findOne();
    if(varaibles){
        totalOrdersSum=varaibles.totalAmount;
        totalAmounts=varaibles.totalAmounts;
    }

    return res.status(200).json({
        success:true,
        totalOrdersSum,
        totalAmounts,
        countOrders,
        orders
    });

});

/// update order status (admin)

export const updateOrder = asyncTryCatch(async (req, res, next) => {

    const order = await orderSchema.findById(req.params.id);
    
    if(order.orderStatus=="Delivered"){
        return next(new ErrorHandler(`You have already have delivered this item,id:${req.params.id}`,404));  
    }

    if(req.body.orderStatus=="Shippied"){
    for(const orderItem of order.orderItems){
        await productSchemaUpdate(orderItem.product,orderItem.quantity);
    }
};


    if(req.body.orderStatus=="Delivered"){
        order.deliveredAt=Date.now();
    }

    order.orderStatus=req.body.orderStatus;

    await order.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        order
    });

});

//// product update function

async function productSchemaUpdate(productId,quantity){
    const product = await productSchema.findById(productId);
    product.stock =product.stock - quantity;
    await product.save({validateBeforeSave:false});
    
    /// outOfStock varaible update in varaiblesSchema

    if(product.stock===0){
        const variables = await varaiblesSchema.findOne();
        if(variables){
            variables.outOfStock=variables.outOfStock+1;
            await variables.save({validateBeforeSave:false});
        }else{
            const newVariable=await varaiblesSchema.create({outOfStock:1});
            await newVariable.save({validateBeforeSave:false});
        }
    }

};


/// Delete order (admin)

export const deleteOrder = asyncTryCatch(async (req, res, next) => {

    const order = await orderSchema.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not found with this id:${req.params.id}`,404));
    }

    /// totalammount remove in varables Schema
    const variables = await varaiblesModel.findOne();
    const totalAmounts=variables.totalAmounts;
        variables.totalAmount=variables.totalAmount-order.totalPrice;


        var nowDate=new Date(order.createAt);

        totalAmounts.forEach((e,i) => {        
            var sendDate=new Date(e.day);
            if(String(sendDate).substring(0,10)===String(nowDate).substring(0,10)){
                if(e.totalAmount-order.totalPrice==0){
                    totalAmounts.splice(i,1);
                }else{
                    e.totalAmount=e.totalAmount-order.totalPrice;
                }
            }
        });

        variables.totalAmounts=totalAmounts;

        await variables.save({validateBeforeSave:false});
    
    await order.remove();

    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })

});