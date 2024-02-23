const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//Create SubSection
exports.createSubSection = async (req,res) => {
    try{
        //fetch data from req body
        const  {sectionId,title,timeDuration,description} = req.body
        //extract file
        const video = req.files.videoUrl;
        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            });
        }
        //upload video on cloudinary -> for secure Url
        const videoUpload = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:videoUpload.secure_url
        })
        //push subsection into the Section
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{subSection:subSectionDetails._id}},{new:true}).populate("Section").exec();

        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
            updateSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Creating SubSection Failed"
        })
    }
}

//Update SubSection
exports.updateSubSection = async(req,res) => {
    try{
        const {subSectionId,title,timeDuration,description} = req.body;
        const video = req.files.videoUrl;
         //validation
         if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            });
        }
        //update data
        const subSection = await SubSection.findByIdAndUpdate(subSectionId,{title,timeDuration,description,video},{new:true});
         // Check if subsection exists and update is successful
         if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            });
        }
        //return res
        return res.status(200).json({
            success:true,
            message:"subSection Updated Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Updating SubSection Failed"
        })
    }
}

//Delete SubSection
exports.deleteSubSection = async (req,res) =>{
    try{
        const {subSectionId} = req.params;
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }
         // Find the parent section containing the subsection
         const section = await Section.findOneAndUpdate(
            { subSection: subSectionId },
            { $pull: { subSection: subSectionId } }
        );

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }
        await SubSection.findByIdAndDelete(subSectionId);
        return res.status(200).json({
            success:true,
            message:"SubSection Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Deleting subSection Failed"
        })
    }

}