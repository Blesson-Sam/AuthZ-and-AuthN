

const express = require('express');
const router= express.Router();

const{signup,login}=require('../Controllers/Auth')
const{auth,isStudent,isAdmin}=require('../Middlewares/auth');

router.post('/signup', signup);
router.post('/login', login);


router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success: true,
        message: 'Welcome to the Protected route for the Student'
    })
});

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success: true,
        message: 'Welcome to the Protected route for the Admin'
    })
})


module.exports = router;