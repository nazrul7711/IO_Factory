const mongoose = require("mongoose")
let objectId = mongoose.Schema.Types.ObjectId;


const MovieSchema = new mongoose.Schema({
  producer:{type:objectId,ref:"Producer",required:true},
  name:{type:String,required:true},
  yearOfRelease:{type:String,required:true},
  plot:{type:String},
  poster:{type:String,default:""},
  actors:[{type:objectId,ref:"Actor",required:true}]

},{timestamps:true})

module.exports = mongoose.model("Movie", MovieSchema);