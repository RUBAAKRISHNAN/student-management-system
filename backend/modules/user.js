const mongoose=require("mongoose");
// const { useState } = require("react");

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true 
},
email:{
    type:String,
    required:true 
},
password:{
    type:String,
    required:true 
}

})
module.exports=mongoose.model("user",userSchema);