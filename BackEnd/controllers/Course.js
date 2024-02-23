const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create Course
exports.createCourse = async (req,res) =>{
    try{
        //fetch data
        const {courseName,courseDescription, whatYouWillLearn,price,category,tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"Add Details are required"
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Not Found"
            });
        }
        //check given tag valid or not
        // const tagDetails = await Tag.findById(tag);
        // if(!tagDetails){
        //     return res.status(400).json({
        //         success:false,
        //         message:"tagDetails Not Found"
        //     });
        // }

         //check given Category valid or not
         const categoryDetails = await Category.findById(category);
         if(!categoryDetails){
             return res.status(400).json({
                 success:false,
                 message:"categoryDetails Not Found"
             });
         }

        //Upload Image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            tag,
            thumbnail:thumbnailImage.secure_url

        });

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        //Update the category Schema
        await User.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data: newCourse
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Fail to create Course"
        })
    }
}

//getAll Courses
exports.showAllCourses = async (res,res) => {
    try{
        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,category:true,
                                                instructor:true,ratingAndReviews:true,studentsEnrolled:true}).populate("instructor").exec();

                        return res.status(200).json({
                            success:true,
                            message:"Courses Fetched Successfully",
                            data:allCourses
                        })
    }
    catch(error){
        console.log(error); 
        return res.status(500).json({
            success:false,
            message:"Internal Server Error Cannot Fetch Courses"
        })
    }
}