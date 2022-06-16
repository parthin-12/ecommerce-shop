import userSchema from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import { asyncTryCatch } from "../middleware/trycatch.js";
import sendToken from "../utils/sendToken.js"
import sendMail from "../utils/sendMail.js"
import crypto from "crypto";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

export const registerUser = asyncTryCatch(async(req,res,next)=>{

    const {name,email,password}=req.body;


    const mycloud = req.body.avatar==="null"? null : await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    }) ;
        
        const user=await userSchema.create({
            name,email,password,
            avatar:{
                public_id:mycloud===null? "sampleId":mycloud.public_id ,
                url:mycloud===null?"sampleUrl":mycloud.secure_url 
            }
        });


    sendToken(user,200,res);
});

//Login

export const loginUser =asyncTryCatch(async(req,res,next)=>{
    const{email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    const user= await userSchema.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched =await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,201,res);
});


// Logout

export const logoutUser =asyncTryCatch(async(req,res,next)=>{
    const options ={
        expires:new Date(
            Date.now()
        ),
        httpOnly:true
    }
    return res.status(200).cookie("token",null,options).json({
        success:true,
        message:"Logged out successfully"
    })
});

// Forget Password

export const ForgetPasswordUser =asyncTryCatch(async(req,res,next)=>{
    
    const {email}=req.body;
    const user=await userSchema.findOne({email});

    if(!user){
        return next(new ErrorHandler("User not exists",404));
    }

    const resetToken= await user.generateResetPasswordToken();
    await user.save({validateBeforeSave:false});
    
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested for reset password then please ignore this mail.`;

    try {
        const options= {
            from:process.env.MAIL_FROM,
            fromPassword:process.env.MAIL_FROM_PASSWORD,
            to:email,
            subject:"Ecommerce Password Recovery",
            message:message
        };

        await sendMail(options);
        return res.status(250).json({
            sucess:true,
            message:`Send mail to ${email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));

    }
});

/// Reset Password

export const resetPassword =asyncTryCatch(async(req,res,next)=>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token ).digest("hex");

    const user = await userSchema.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});

    if(!user){
        return next(new ErrorHandler("Reset Password link is Invalid or has been expired"),400);
    };

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnot match"),400);
    };

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    return res.status(200).json({
        success:true
    });

});

//// GET USER DETAILS

export const getAllUsers =asyncTryCatch(async(req,res,next)=>{

    let users = await userSchema.find();

    if(!users){
        return next(new ErrorHandler("There are no users"),404);
    }

    const countUsers=users.length;
    const usersPerPage=req.query.pageSize;
    
    const apiFeature= new  ApiFeatures(userSchema.find(),req.query).pagination(usersPerPage);

    users=await apiFeature.query;

    return res.status(200).json({
        success:true,
        users,
        countUsers
    });
});

//// GET USER BY ID 

export const getUser =asyncTryCatch(async(req,res,next)=>{

    const user = await userSchema.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User doesnot exist"),404);
    }

    return res.status(200).json({
        success:true,
        user
    }); 

});


/// UPDATE PASSWORD 

export const updatePassword =asyncTryCatch(async(req,res,next)=>{

    const user = await userSchema.findById(req.user.id).select("+password");
    const{oldPassword,password,confirmPassword} = req.body;
    if(!user){
        return next(new ErrorHandler("User doesnot exist"),404);
    }

    const isOldPasswordCorrect = await user.comparePassword(oldPassword);

    if(!isOldPasswordCorrect){
        return next(new ErrorHandler("Old Password is Incorrect"),400);
    }

    if(password!=confirmPassword){
        return next(new ErrorHandler("Password doesnot match"),400);
    }

    if(password==oldPassword){
        return next(new ErrorHandler("Password is same as old password"),400);
    }

    user.password=password;

    await user.save();

    sendToken(user,200,res);

});

/// UPDATE PROFILE

export const updateProfile =asyncTryCatch(async(req,res,next)=>{

    let user = await userSchema.findById(req.user.id);

    const mycloud = req.body.avatar==="null"? null : (

        await cloudinary.v2.uploader.destroy(user.avatar.public_id), 

        await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    }) );

    if(!user){
        return next(new ErrorHandler("User doesnot exist"),404);
    }

    const changes = {
        email : req.body.email,
        name: req.body.name,
        avatar :{
            public_id:mycloud===null? user.avatar.public_id :mycloud.public_id ,
            url:mycloud===null?user.avatar.url:mycloud.secure_url 
        }
    };

    user = await userSchema.findByIdAndUpdate(req.user.id,changes,{new:true, runValidators:true,useFindAndModify:false})

    return res.status(200).json({
        success:true,
        message:"Update Successfully"
    });

});

//// GET USER BY ID (admin)

export const adminGetUser =asyncTryCatch(async(req,res,next)=>{

    const user = await userSchema.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User doesnot exist"),404);
    }

    return res.status(200).json({
        success:true,
        user
    }); 

});

//// Update Admin

export const adminUpdateProfile =asyncTryCatch(async(req,res,next)=>{

    let user = await userSchema.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User doesnot exist"),404);
    }

    const changes = {
        email : req.body.email,
        name: req.body.name,
        role:req.body.role
    };


    user = await userSchema.findByIdAndUpdate(req.params.id,changes,{new:true, runValidators:true,useFindAndModify:false})

    return res.status(200).json({
        success:true,
    });

});

//// Delete User  (admin)

export const adminDeleteUser =asyncTryCatch(async(req,res,next)=>{

    const user = await userSchema.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesnot exist, user_id is ${req.params.id}`),400);
    }

    if(user.avatar.public_id!=="sampleId"){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    
    await user.remove();

    return res.status(200).json({
        success:true,
    }); 

});

