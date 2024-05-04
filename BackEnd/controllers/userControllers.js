import { userModel } from "../models/userModel.js";
import { AccountModel } from "../models/AcoountModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import zod from "zod";
const signUpozod=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    email:zod.string(),
    password:zod.string(),
})
const signInzod=zod.object({
    email:zod.string(),
    password:zod.string()
})
export class allControllersPaytmUsers{
    static signup=async(req,res)=>{
        try{
            const { success, error } = signUpozod.safeParse(req.body);
            if (!success) {
                return res.status(400).send({ msg: error.issues[0].message }); // Specific validation error message
            }
            const {firstname,lastname,email,password}=req.body;
            const exist=await userModel.findOne({email});
            if(exist){
                res.send({
                    msg:"the user already exists"
                })
            }
            //password hashing using bcrypt
            const salt=10;
            const hashedPassword=await bcrypt.hash(password,salt);
            const user_here=await userModel.create({
                first_name:firstname,
                last_name:lastname,
                email:email,
                password:hashedPassword
            })
            const userID=user_here._id;
            const UserAccount=await AccountModel.create({
                userID,
                balance:1+Math.random()*10000
            })
            const token =jwt.sign({userID},JWT_SECRET)
            res.send({
                msg:"the user is created and now u can use paytm.... and a account has been made of yours ",
                user:UserAccount,
                token:token
            })
        }catch(err){
            console.log(err)
        }
    }
    static signIN = async (req, res) => {
        try {
            const { success } = signInzod.safeParse(req.body);
            if (!success) {
                return res.status(400).json({
                    msg: "Invalid credentials format"
                });
            }
            const { email, password } = req.body;
            // Check if the user email exists
            const exist = await userModel.findOne({ email });
            if (!exist) {
                // If user doesn't exist, return a message with status code 404 (Not Found)
                return res.status(404).json({
                    msg: "User with this email doesn't exist"
                });
            }
            try {
                const isPassMatched = await bcrypt.compare(password, exist.password);
                if (isPassMatched) {
                    const userID = exist._id;
                    const token = jwt.sign({ userID }, JWT_SECRET);
                    return res.json({
                        msg: "Login successful",
                        user: exist,
                        token: token
                    });
                } else {
                    // If password doesn't match, return an error with status code 401 (Unauthorized)
                    return res.status(401).json({
                        msg: "Incorrect password"
                    });
                }
            } catch (err) {
                console.log(err);
                // Internal server error
                return res.status(500).json({
                    error: "Internal Server Error"
                });
            }
        } catch (err) {
            console.log(err);
            // Bad request
            return res.status(400).json({
                error: "Bad Request"
            });
        }
    };
    
    
    static updateInfo=async(req,res)=>{
        try{
          //body theke useremail pabo and then findbyidandupdate or something suppose the password is written 
          //so the request must change the password to  what the user has put >>
          const {email,password}=req.body;
          const user =await userModel.findOne({email});
          console.log(user);
          const hashedPassword=await bcrypt.hash(password,10)
          const result =await userModel.findByIdAndUpdate(user._id,{$set:{password:hashedPassword}});
          console.log(`result: ${result}`)
          if(result){
            res.send({
                msg:"the updation is done"
            })
          } else{
            res.send({
                msg:"something went wrong.. like there is no user in the database with that email"
            })
          }
        }catch(err){
            console.log(err);
        }
    }
    static filterusers=async(req,res)=>{
        try{
            const filter = req.query.filter|| ""; // Convert filter to lowercase
            if(filter==""){
                const allUsers=await userModel.find({_id:{ $ne: req.userID }});
                res.json({
                    users:allUsers
                })
            }else{
                const users = await userModel.find({
                    $and: [
                        {
                          _id: { $ne: req.userID } // Exclude the current user
                        },
                            {
                            $or: [{
                                first_name: { $regex: new RegExp(filter, "i") } // Use 'i' flag for case-insensitive
                            }, {
                                last_name: { $regex: new RegExp(filter, "i") }
                            }]
                }
            ]
                });
            if(users){
                res.json({
                    users:users.map((user) => ({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        user_email: user.email,
                        // Consider excluding password for security reasons
                      }))
                })
            }else{
                res.json({
                    msg:"there is no user with that very filter or somthing that matches with that "
                })
            }
            }
        }catch(err){
            console.log(err)
        }
    }
}