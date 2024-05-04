import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config.js'
//ill get the token from the authorization header and .. put that to verify with the jst SECRET and if yes call next ..else give some errors that resonates that u are not verified >>
export const auth=async(req,res,next)=>{
     try{
        const token = req.headers.authorization;
        if(token){
         const isVerified= jwt.verify(token,JWT_SECRET);
         if(isVerified){
            req.userID=isVerified.userID;
            next();
         }else{
            res.send({
                msg:"u are not verified"
            })
         }
        }else{
         res.send({
            msg:"token must be povided in the headers"
         })
        }
     }catch(err){
        console.log(err)
     }
}