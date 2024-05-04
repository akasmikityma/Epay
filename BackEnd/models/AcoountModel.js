import mongoose from "mongoose";

const AccountSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'paytmUser',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

export const AccountModel=new mongoose.model('acoount',AccountSchema);