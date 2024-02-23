const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


//resetPassword Token
exports.resetPasswordToken = async (req,res) => {
    
    try{
        //get email from body
        const email = req.body;
        //check user from email,email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!,Sign Up"
            })
        }
        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration date
        const updatedDetails = await User.findOneAndUpdate( {email:email}, {token:token,resetPassword:Date.now() + 5*60},{new:true});
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing url
        await mailSender(email,"Password Reset",`Password Reset Link -> ${url}`)
        //return response
        return res.status(200).json({
            success:true,
            message:"Password Reset Link Sent Successfully,Change Password"
        });
    }
    catch(error){
        console.log("Cannot Reset Password",error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong,Cannot Reset Password"
        })
    }


    
}

//resetPassword
exports.resetPassword = async (req,res) => {

    try{
        //data fetch
        const {password,confirmPassword,token} = req.body
        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password Not Matching"
            });
        }
        //get userCred from db using token
        const userDetails = await User.findOne({token:token});
        //if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Invalid Token"
            })
        }
        //check token time
        if(userDetails.resetPassword < Date.now()){
            return res.json({
                success:false,
                message:"Token Expired,Generate token Again"
            })

        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //update password
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        //return response
        return res.status(400).json({
            success:true,
            message:"Successfully Password Reseted "
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:""
        })
    }
}