const express=require('express')
const cors = require('cors');
const app=express()
require("dotenv").config()
const {connection} =require('./db')
const { urlRouter } = require('./url.routes')
 app.use(express.json())
 app.use(cors());
 app.use(urlRouter)
 app.listen(8080,async()=>{
   try{
     await connection
    console.log("DB is connected")
    console.log("App is running at port 8080")
   } catch(err){
       console.log(err)
   }
    
 })