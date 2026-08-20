const mongoose=require('mongoose');
const studentScema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    }})

   const student= mongoose.model('Student',studentScema);
   module.exports=student;