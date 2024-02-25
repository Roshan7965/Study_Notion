const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initiate the razorpay order
exports.capturePayment = async (req,res) => {

        //get courseId and UserId
        const course_id = req.body;
        const userId = req.user.id;
        //validation
        if(!course_id){
            return res.status(404).json({
                success:false,
                message:"Course Not Found"
            })
    
        }
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
    
        }
        //valid courseDetail
        let course;
        try{
            course = await Course.findById(course_id)
            if(!course){
                    return res.status(400).json({
                        success:false,
                        message:"Course Not Found"
                    })
            }
             //user already pay for the course or not
             const uid = new mongoose.Types.ObjectId(userId);
             if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"You have already Enrolled This course"
                })
             }

        }catch(error){
            console.error(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }

        //create order
        const amount = course.price
        const currency = "INR";
        const options = {
            amount:amount*100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId
            }
        };

        try{
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                message:"Congratulations!!,Course Added to your Dashboard",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })
        }
        catch(error){
            console.log(error)
            res.json({
                success:false,
                message:"Failed while initiating order"
            })
        }

}

//Verify signature for payment
exports.verifySignature = async(req,res) => {
    const webhookSecret = "bhushan20";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment Authorized");

        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try{
            //fulfill the action

            //find course and enroll student 
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
                                                                {$push:{studentsEnrolled:userId}},{new:true})

            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"Course not found"
                })
            }

            //find the student and add the course to their list enrolled course
            const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
            console.log(enrolledStudent)

            //send Mail for conformation
            const emailResponse = await mailSender(
                                                    enrolledStudent.email,
                                                    "Congratulations From StudyNotion!!",
                                                    "you are successfully enrolled in Course"
            );
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added"
            })

        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Signature Not Verified"
            })
        }
    }
    else{
        return res.status(200).json({
            success:false,
            message:"Signature Not  Verified and Course Added"
        })
    }

}