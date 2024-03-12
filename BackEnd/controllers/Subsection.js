// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
	try {
		// Extract necessary information from the request body
		const { sectionId, title, timeDuration, description } = req.body;
		const video = req.files.video;

		// Check if all necessary fields are provided
		if (!sectionId || !title || !timeDuration || !description || !video) {
			return res
				.status(404)
				.json({ success: false, message: "All Fields are Required" });
		}

		// Upload the video file to Cloudinary
		const uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_NAME
		);

		// Create a new sub-section with the necessary information
		const SubSectionDetails = await SubSection.create({
			title: title,
			timeDuration: timeDuration,
			description: description,
			videoUrl: uploadDetails.secure_url,
		});

		// Update the corresponding section with the newly created sub-section
		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{ $push: { subSection: SubSectionDetails._id } },
			{ new: true }
		).populate("subSection");

		// Return the updated section in the response
		return res.status(200).json({ success: true, data: updatedSection });
	} catch (error) {
		// Handle any errors that may occur during the process
		console.error("Error creating new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};
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