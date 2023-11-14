const mongoose=require("mongoose")
const shortid = require('shortid');
const urlSchema=mongoose.Schema({
  originalUrl: {type:String,unique: true},
  shortUrl: { type: String, unique: true, default: shortid.generate },
  createdAt: { type: Date, default: Date.now },
  expirationTime: { type: Number, default: 0 },
},
{
    versionKey:false
})
const urlModal=mongoose.model('url',urlSchema)
module.exports={urlModal}