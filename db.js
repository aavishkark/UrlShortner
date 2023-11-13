const mongoose=require('mongoose')
require("dotenv").config()
const connection= mongoose.connect("mongodb+srv://aavishkark:3G9ycYMyKcSIwLKn@cluster0.wvrt9o0.mongodb.net/?retryWrites=true&w=majority")
module.exports={connection}