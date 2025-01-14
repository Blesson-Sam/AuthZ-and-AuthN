

const mongoose = require('mongoose');

const signupSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["Admin","Student"]
        }
    }
)
module.exports =mongoose.model('Signup',signupSchema);