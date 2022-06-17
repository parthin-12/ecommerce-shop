import productSchema from "../models/productModel.js";
import ErrorHandler from "../utils/utilsErrorHandler.js";
import { asyncTryCatch } from "../middleware/trycatch.js"
import ApiFeatures from "../utils/apiFeatures.js";
import varaiblesModel from "../models/varaiblesModel.js";
import cloudinary from "cloudinary"

// create a product (admin)

export const createProduct = asyncTryCatch(async (req, res, next) => {

    let images=[];

    if(typeof req.body.images==="string"){
        images.push(req.body.images);
    }else{
        images=req.body.images;
    }

    let imagesLink=[];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:"products"
        })

        imagesLink.push({
            public_id:result.public_id,
            url:result.url
        })
    }

    const variables = await varaiblesModel.findOne();

    
    /// outOfStock varaible update in varaiblesSchema
        if(Number(req.body.stock)===0){
            if(variables){
                variables.outOfStock=variables.outOfStock+1;
            }else{
                const newVariable=await varaiblesModel.create({outOfStock:1});
                await newVariable.save({validateBeforeSave:false});
            }
        }
    //// insert category in variables Schema
        const isCategory=variables.categories.find(e=>e===req.body.category);
        if(!isCategory){
            variables.categories.push(req.body.category);
        }
        
        /// allocating maxProduct price in varaible schema
        

        if(variables.maxProductPrice<req.body.price){
            const maxProductPriceLength=req.body.price.length-1;
            let maxProductPrice=req.body.price;
            if(maxProductPriceLength){
                maxProductPrice=Math.ceil(maxProductPrice/Math.pow(10, maxProductPriceLength))*Math.pow(10, maxProductPriceLength);
            }
            variables.maxProductPrice=maxProductPrice;
        }
        
    await variables.save({validateBeforeSave:false});


    req.body.images=imagesLink;
    req.body.createBy=req.user.id;
    const product = await productSchema.create(req.body);
    return res.status(201).json({ success: true, product });
});






// get all products 

export const getAllProducts = asyncTryCatch(async (req, res, next) => {

    const productsPerPage = Number(req.query.pageSize);

    // const countProducts = await productSchema.countDocuments();

    let apiFeature = new ApiFeatures(productSchema.find(), req.query).search().filter();
    let products = await apiFeature.query;
    let outOfStock=0;
    let categories=[];
    let maxProductPrice=0;

    const countProducts=products.length;
    apiFeature = new ApiFeatures(productSchema.find(), req.query).search().filter().pagination(productsPerPage);
    products = await apiFeature.query;

    ///get outOfStock Products
    const varaibles = await varaiblesModel.findOne();
    if(varaibles){
        outOfStock=varaibles.outOfStock;
        categories=varaibles.categories;
        maxProductPrice=varaibles.maxProductPrice;
    }

    return res.status(200).json({ success: true, products,countProducts,productsPerPage,outOfStock,categories,maxProductPrice});
});


// update product by id (admin)

export const updateProduct = asyncTryCatch(async (req, res, next) => {
    let product = await productSchema.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    if(req.body.images){

            /// deleting Images from cloudinary

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            
        }

        let images=[];

        if(typeof req.body.images==="string"){
            images.push(req.body.images);
        }else{
            images=req.body.images;
        }
    
        let imagesLink=[];
    
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder:"products"
            })
    
            imagesLink.push({
                public_id:result.public_id,
                url:result.url
            })
        }

    req.body.images=imagesLink;

    }

    /// outOfStock varaible update in varaiblesSchema
        const variables = await varaiblesModel.findOne();
        if(Number(req.body.stock)===0 && product.stock!==0){
            variables.outOfStock=variables.outOfStock+1;
            await variables.save({validateBeforeSave:false});
        }else if(Number(req.body.stock)!==0 && product.stock===0){
            variables.outOfStock=variables.outOfStock-1;
            await variables.save({validateBeforeSave:false});
        }

    product = await productSchema.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
    return res.status(200).json({ success: true, product });
});


// delete product by id (admin)

export const deleteProduct = asyncTryCatch(async (req, res, next) => {
    let product = await productSchema.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    /// deleting Images from cloudinary

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
    }

    /// outOfStock varaible update in varaiblesSchema
    if(product.stock===0){
        const variables = await varaiblesModel.findOne();
            variables.outOfStock=variables.outOfStock-1;
            await variables.save({validateBeforeSave:false});
    }

    await product.remove();
    return res.status(200).json({ success: true, message: "Product Deleted Sucessfully" });

});

/// getproduct by id 

export const getProduct = asyncTryCatch(async (req, res, next) => {
    let product = await productSchema.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    return res.status(200).json({ success: true, product });

});

/// create new and update review 

export const createProductReview = asyncTryCatch(async (req, res, next) => {

    const product = await productSchema.findById(req.body.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:req.body.rating,
        comment:req.body.comment,
        image:req.user.avatar
    };
    
    let isReviewed =product.reviews.find(review=>review.user.toString()== req.user.id);
    let message="";
    let sumRating=0;

    if(isReviewed){
        product.reviews.forEach((e,i) => {
            if(e.user.toString()== req.user.id){
                product.reviews[i]=review;
            };
        });
        message="Review Updated Successfully";
    }
    else{
        product.reviews.push(review);
        message="Review Added Successfully";
        product.numOfReviews=product.reviews.length;
    }

    product.reviews.forEach(review => {
        sumRating=sumRating+review.rating;     
    });
    
    product.rating=sumRating/product.numOfReviews;

    await product.save({validateBeforeSave:false});
    
    return res.status(200).json({
        success:true,
        message
    });
});


/// GET ALL REVIEWS OF SINGLE PRODUCT

export const getProductReviews = asyncTryCatch(async (req, res, next) => {

    const product = await productSchema.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews=product.reviews;

    return res.status(200).json({
        success:true,
        reviews
    });

});

// DELETE REVIEW 

export const deleteProductReview = asyncTryCatch(async (req, res, next) => {

    const product = await productSchema.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let reviews = product.reviews.filter(review => review._id.toString()  != req.query.reviewId);

    let sumRating=0;
    reviews.forEach(review => {
        sumRating=sumRating+review.rating;     
    });
    
    const rating=(sumRating/reviews.length) || 0;
    const numOfReviews=reviews.length;
    
    await productSchema.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    return res.status(200).json({
        success:true,
        message:"Delete review successfully"
    }); 

});


/////create Category

export const createCategory = asyncTryCatch(async (req, res, next) => {

    const varaibles = await varaiblesModel.findOne();

    if(!varaibles){
        return next(new ErrorHandler("Categories Not Found", 404));
    }
    const isCategory=varaibles.categories.find(e=>e===req.body.category);

    if(isCategory){
        return next(new ErrorHandler("Category Already Exist", 404));
    }

    varaibles.categories.push(req.body.category);

    await varaibles.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true
    }); 

});


//// Updating and Deleting Category

export const updateCategory = asyncTryCatch(async (req, res, next) => {

    let varaibles = await varaiblesModel.findOne();

    if(!varaibles){
        return next(new ErrorHandler("Categories Not Found", 404));
    }

    let apiFeature = new ApiFeatures(productSchema.find(), req.query).filter();
    let products = await apiFeature.query;


    
    if(products){
        for (let i = 0; i < products.length; i++) {
            const product= await productSchema.findById(products[i]._id);
            
            if(req.body.updatedCategory!=="Delete"){
                product.category=req.body.updatedCategory;
                await product.save({validateBeforeSave:false});
            }else{
                for (let j = 0; j < product.images.length; j++) {
                    await cloudinary.v2.uploader.destroy(product.images[j].public_id);
                    
                }
            
                /// outOfStock varaible update in varaiblesSchema
                if(product.stock===0){
                    const variables = await varaiblesModel.findOne();
                        variables.outOfStock=variables.outOfStock-1;
                        await variables.save({validateBeforeSave:false});
                }
            
                await product.remove();
            }   
        }
    }

    let categories=varaibles.categories.filter(e=>e!==req.body.oldCategory);
    varaibles.categories=categories;

    await varaibles.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true
    }); 

});