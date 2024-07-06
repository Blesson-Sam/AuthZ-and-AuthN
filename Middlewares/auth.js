

// Authorization , isStudent, isAdmin, 

const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try{
        // extract JWT token

        
        const token=req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        if(!token)
        {
            return res.status(401).json({msg:'No token, authorization denied'})
        }

        // verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({msg:'Token is not valid'})

    }
}

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role !=='Student'){
            return res.status(401).json({msg:'Not a Student'})
        }
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'})
    }

}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role !=='Admin'){
            return res.status(401).json({msg:'Not a Admin'})
        }
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'})
    }

}