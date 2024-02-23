const User = require("../models/User");
const jwt = require("jsonwebtoken")
require("dotenv").config();

//authorization
exports.auth = async(req,res,next) => {
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();
    }
    
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went Wrong while validating token"
        })
    }
}

//isStudent
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for Students Only"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role Cannot verified,Try Again After some time"
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for Instructor Only"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role Cannot verified,Try Again After some time"
        })
    }
}

//isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for Admin Only"
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role Cannot verified,Try Again After some time"
        })
    }
}
