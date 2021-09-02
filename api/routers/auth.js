const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

let mailTransport=nodemailer.createTransport({
    service:"gmail",
    auth:{
    user:"sandeepbellary97@gmail.com",
    pass:"8880012280"
    }
    })
    
//Register 
router.post('/register', async (req,res) =>{
   
    let mailDetails={
        from:"sandeepbellary97@gmail.com",
        to:req.body.email,
        subject:" mail confirmation",
        text:"thaks for registering into mycinema app"
        }
 try{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    });
 
    const user = await newUser.save();
    res.status(201).json(user);
    await mailTransport.sendMail(mailDetails,(err)=>{
    if(err){
    console.log("fail to send email")
    }else{
    console.log("mail sent")
    }
    })
 }catch(err){
 res.status(500).json(err);
 } 
});

//login
router.post('/login',async (req,res)=>{
    try {
    const user =await User.findOne({email: req.body.email});
    !user && res.status(401).json("Wrong password or username!");
   
    const bytes = CryptoJS.AES.decrypt(user.password , process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
   
    originalPassword !== req.body.password &&
    res.status(401).json("Wrong password or username!");
   
    const accessToken = jwt.sign({id:user._id,isAdmin: user.isAdmin},process.env.SECRET_KEY,{expiresIn:"1d"});
    
    const {password, ...info} = user._doc;
   
    res.status(200).json({...info,accessToken})
    } catch (err) {
    res.status(500).json(err);
    }
   })
module.exports = router;