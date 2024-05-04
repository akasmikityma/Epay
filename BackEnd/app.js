import express from "express";
import { connectMethod } from "./database/connection.js";
import { dburl } from "./config.js";
import router from "./Routes/userRouter.js";
import cors from "cors"

const app=express();
app.use(cors())
app.use(express.json());
connectMethod(dburl)
app.use('/',router)
app.listen(3000,()=>{
    console.log("the server is running on 3000")
})