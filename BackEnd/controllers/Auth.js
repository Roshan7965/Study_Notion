const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/mailSender");
require("dotenv").config();


//Send OTP
exports.sendOTP = async(req,res) => {
    //Fetch Email from req body
    const {email} = req.body;

    try{
        
        //Check if user Already exist
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Registered"
            })

        }

        //generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("OTP generated",otp);

        //check unique OTP or not
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator(6,{
                upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
            });

            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        //create an entry in db
        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })
    }
    catch(error){
        console.log("Error While generating OTP",error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

//SignUp
exports.signUp = async(req,res) => {

    try{

        //Fetch data from body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,otp} = req.body;

            //Validation
            if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                })
            }

            //match Password 
            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password Not Matching,Try Again!!"
                })
            }

            //check User already registered or not
            const existingUser = await User.findOne({email})
            if((existingUser)){
                return res.status(400).json({
                    success:false,
                    message:"User Already Registered!!"
                })
            }

            //find most recent otp stored for the user
            const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
            //validate OTP
            if(recentOtp.length == 0){
                //OTP not added
                return res.status(400).json({
                    success:false,
                    message:"Invalid OTP",
                })
            }
            else if(otp !== recentOtp){
                return res.status(400).json({
                    success:false,
                    message:"Invalid OTP",
                })
            }

            //Hash Password
            const hashedPassword = await bcrypt.hash(password,10);

            const profileDetails = await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null
            })

            //entry create in DB
            const user = await User.create({
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

            })

            //return res
            res.status(200).json({
                success:true,
                message:"User Registered Successfully",
                user
            })
        
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User Cannot Registered,Try Again"
        })
    }
}

//Login
exports.login = async (req,res) => {

    try{
        //get Data from body
        const {email,password} = req.body
        //validate Data
        if(!email && !password || !email && !password){
            return res.status(400).json({
                success:false,
                message:"Enter correct Email or Password"
            })
        }
        //Check User exits or not
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found !!, SignUp",
            });
        }
        //Compare email and password && Generate JWT
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send res
            const options = {
                expires:new Date(Date.now() + 3*34*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Email Or Password"
            })
        }

    }
    catch(error){
        console.log("Error While Logging",error);
        res.status(500).json({
            success:false,
            message:"Login Failure,Try Again"
        });
    }
}

//Change Password
exports.changePassword = async(req,res) => {
    //Get Data from body
    //get Old Password,newPassword,confirm Password
    //validate Password
    //update Password in DB
    //send Mail - Password Updated 
    //return response

    

    try{
        const {oldPassword,newPassword,confirmPassword,email} = req.body;
        const user = await User.findOne({email});
        if(oldPassword !== user.password){
            return res.status(401).json({
                success:false,
                message:"Password does not match"
            })
        }
        else{
            if(newPassword !== confirmPassword){
                return res.json({
                    message:"Password Not Matching,Confirm Password"
                })
            }
        }
    }
    catch(error){
        
    }
}
