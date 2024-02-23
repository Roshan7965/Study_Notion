const Section = require("../models/Section");
const Course = require("../models/Course");

//Create Section
exports.createSection = async (req,res) =>{

    try{
        //data fetch
        const {sectionName,courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All Fields are Mandatory"
            })
        }
        //create Section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedCourse
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Creating Section Failed"
        })
    }
}

//Update Section
exports.updateSection = async(req,res) =>{
    try{
        //data input
        const {sectionName,sectionId} = req.body
        //validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Fill Details Correctly !!!"
            })
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        if(!section){
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Updating Section Failed"
        })
    }
}

//Delete Section
exports.deleteSection = async (req,res) =>{
    try{
        //get Id from params
        const {sectionId} = req.params;
        // const sectionId = req.body;
        //findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[testing]:need to delete the entry from course schema
        //return res
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Deleting Section Failed"
        })
    }
}