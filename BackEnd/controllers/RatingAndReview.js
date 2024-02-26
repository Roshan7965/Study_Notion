const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

//create Rating
exports.createRating = async (req,res) => {
    try{
        //get userId
        const userId = req.user.id;
        //fetch data from body
        const {rating,review,courseId} = req.body
        if(courseId !== Course.findById(courseId)){
            return res.status(404).json({
                success:false,
                message:"Course Not Found"
            })
        }
        //check if user enrolled or not 
        const courseDetails = await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student Not Enrolled in Course"
            })
        }
        //already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({user:userId,course:courseId});
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Already Reviewed By User"
            })
        }
        //create review and rating
        const ratingReview = await RatingAndReview.create({rating,review,course:courseId,user:userId})

        //update course with rating & review
        const updateCourse = await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview._id}},{new:true})
        updateCourse.save();

        return res.status(200).json({
            success:true,
            message:"Thanks for Creating Rating and Review"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"You are not able to review this course"
        })
    }
}

//get Average Rating
exports.getAverageRating = async (req,res) => {
    try{
        //get courseId
        const courseId = req.body.courseId;
        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }
        //if no rating exist
        return res.status(200).json({
            success:true,
            message:"No Rating,So Avg is 0"
        })
    }
    catch(error){

    }
}
//get All Rating