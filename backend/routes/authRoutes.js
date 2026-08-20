const express=require("express");
const bcrypt=require("bcryptjs");
const user=require('../modules/user');
const jwt=require('jsonwebtoken');
const authMiddleware = require("../middleware/authMiddleware");

const router=express.Router();
router.post('/register',async (req,res)=>{
    try{
        const{name,email,password}=req.body;
        console.log(name);
        console.log(email);
        console.log(password);
        if(!name || !email || !password){
           return  res.status(400).json({
                message:"please check the field"
            })
        }
        const existingUser=await user.findOne({email});
        if(existingUser){
           return res.status(400).json({
                message:"This gmail already Exist"
            })
        }   
        const hashPassword=await bcrypt.hash(password,10);
        const newuser=new user({
            name,email,password:hashPassword
        })
        await newuser.save();
       return res.status(201).json({
            message:"User registered successfully"
        })

    }
    catch(err){
            console.log(err);

    res.status(500).json({
        message: "Server error",
        error: err.message
    });
    }
})
router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
                return res.status(400).json({
                    message:"Enter Email and PassWord"
                })
        } 
        const User=await user.findOne({email});  
        if(!User){
            return res.status(400).json({
                message:"First Register Email"
            })
        }
        const matchpass=await bcrypt.compare(password,User.password);
        if(!matchpass){
           return  res.status(400).json({
                message:"Your password is mismatch"
            })
        }
        const token=jwt.sign(
            {
                id:user._id,
                email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )

        res.status(200).json({
            message:"Loggin Sucessfull",
            token:token,
            User:{
                id:User._id,
                email:User.email,
                name:User.name
            }
        })
    }
    catch(err){
            console.log(err);
            res.status(500).json({
                message:"Server Error"
            })
    }
})
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated!",
        user: req.user
    });
});
module.exports=router;