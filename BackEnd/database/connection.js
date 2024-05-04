import mongoose from "mongoose";

export const connectMethod=async(url)=>{
    try{
     const dbOptions={
        dbname:"paytm"
      }
      const result=await mongoose.connect(url,dbOptions);
      if(result){
        console.log("the database is connected")
      }
    }catch(err){
        console.log(err)
    }
}