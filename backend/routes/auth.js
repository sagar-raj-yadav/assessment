import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config"

const router=express.Router();


//router 1
router.post('/signup',async (req,res)=>{
    const {name,email,password}=req.body;  

    try{
        if(!name || !email || !password){
            return res.status(400).json({error:"All fields are required"});
        }

        if(!email.includes("@")){
            return res.status(400).json({error:"Invalid email"});
        }

        if(password.length<6){
            return res.status(400).json({error:"password length must me greater than 6"});
        }
        
        const finduser=await User.findOne({email});

        if(finduser){
            return res.status(400).json({error:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=await User({name,email,password:hashedpassword});
        await newuser.save();
        console.log(newuser);
        res.status(201).json({success:"signup sccessfull"});

    }
    catch(error){
        console.log(error);
        res.status(500).json("Internal server Error");
    }


});


//router 2
router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        if( !email || !password){
            return res.status(400).json({error:"All fields are required"});
        }

        if(!email.includes("@")){
            return res.status(400).json({error:"Invalid email"});
        }

        const finduser=await User.findOne({email});

        if(!finduser){
            return res.status(400).json({error:"user not find"});
        }

        const matchpassword=await  bcrypt.compare(password,finduser.password);

        if(matchpassword){
            const token=await jwt.sign({id:finduser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(201).json({token,success:"login seccessfull"});
        }
        else{
            res.status(404).json({error:"Incorrect email or password"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error");

    }
})

export default router;