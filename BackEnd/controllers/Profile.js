const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")

//Update Profile
exports.updateProfile = async(req,res) => {

    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get userId
        const id = req.user.id
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                message:"User Not Found!"
            })
        }

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId); 

        //update profile    
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Profile Not Updates,Internal Server Error"
        })
    }
}

//Delete Profile
exports.deleteProfile = async(req,res) => {
    try{
        //get id
        const id = req.user.id;
        //validation
        if(!id){
            return res.status(404).json({
                success:false,
                message:"User Not Found!!"
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //Remove user from all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Deleting Profile Failed"
        })
    }
}

//get All User Details
exports.getUserDetails = async(req,res) => {
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"Fetched User Details"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to Fetch User"
        })
    }
}