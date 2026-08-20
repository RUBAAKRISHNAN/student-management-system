const express=require('express');
const cors=require("cors");
const mongoose=require('mongoose');

require('dotenv').config();
const studentRoutes = require("./routes/studentRoutes");

 const authRouter=require('./routes/authRoutes');


const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);


 app.use("/api/auth",authRouter)


mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("MongoDB connected");
}).catch((err)=>{
      console.log(err);
})

 app.get('/',(req,res)=>{
    res.send("Hello World");
    console.log("Hello World");
 })
 app.listen(5000,()=>{
    console.log("Server is running on port 5000");
 })
