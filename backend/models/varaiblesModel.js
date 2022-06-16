import mongoose from "mongoose";

const varaiblesSchema= new mongoose.Schema({
    outOfStock:{
        type:Number,
        default:0
    },
    totalAmount:{
        type:Number,
        default:0
    },
    totalAmounts:[{
        totalAmount:{
            type:Number,
            default:0
        },
        day:{
            type:Date,
        }
    }],
    categories:[{
        type:String
    }],

});

export default mongoose.model("varaiblesSchema",varaiblesSchema);

