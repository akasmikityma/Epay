import { AccountModel } from "../models/AcoountModel.js";
import mongoose from 'mongoose'
export class allAccControllers{
    static fetchAmount=async(req,res)=>{
        try{
            const userid=req.query.id;
            
            const found=await AccountModel.findOne({userID:userid});
            console.log(found)
            if(found){
                res.json({
                    balance:found.balance
                })
            }else{
                res.json({
                    msg:"this account doesnt exist"
                })
            }
        }catch(err){
            console.log(err)
        }
    }
    static transfer=async(req,res)=>{
        try{ 
           
           const {to,amount}=req.body;
           //first check the user 
           console.log(req.userID)
           const userAccount=await AccountModel.findOne({userID:req.
            userID})
           if(!userAccount||userAccount.balance<amount){
            //abort the session
                return res.send({
                    msg:"this userid has no Account in our database/insufficient Balance"
                })
           }
           const toUserAccount=await AccountModel.findOne({userID:to})
           if(!toUserAccount){
               return  res.send({
                    msg:"this userid has no Account in our database",
                    code:404
                })
           }
           await AccountModel.updateOne({userID:req.
            userID},{$inc:{balance:-amount}})
           await AccountModel.updateOne({userID:to},{$inc:{balance:amount}})
           res.send({
            msg:"transaction is successful"
           })
        }catch(err){
            console.log(err);
        }
    }

}

//body has to:String and amount number .. 
// check-1: if the user have less money than what it has put in the amount section of the request then 
// check-2: if the userIs giving some other id ..like the user doesnt have any acount only >>
// lastly send user a msg:"transfer is successful" if all these checks gets successful

