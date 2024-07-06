

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const User=require('../Models/signup');
const { response } = require('express');

require('dotenv').config();

exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:'User already exists'});

        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({error:"Internal Error"});
        }

        const response=await User.create({name,email,password:hashedPassword,role})
        res.status(201).json({message:'User registered successfully',data:response});
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:'Please provide email and password'});
        }

        var user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'User not found'});
        }
        
        const playload={
            email:user.email,
            id:user._id,
            role:user.role,
        }
        
        if(await bcrypt.compare(password,user.password)){
            let token= jwt.sign(playload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            });
            user.token = token;
            user.password = undefined;

            const option={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie('token',token,option).json({
                success:true,
                token,
                user,
                message:'user loggin in successfully'
            })

        
        }else{
            res.status(403).json({message: 'Invalid Password'});
        }
    }catch(e){
        console.error(e);
        res.status(500).json({error:"Internal Server Error"});
    }
}