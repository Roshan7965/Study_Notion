const Section = require("../models/Section");
const Course = require("../models/Course");


// CREATE a new section
exports.createSection = async (req, res) => {
	try{
	  //Data fetch
	  const {sectionName, courseId} =req.body;
  
	  //Data validation
	  if (!sectionName || !courseId) {
		return res.status(400).json({
		  error: "Please provide section name and course id"
		});
	  }
  
	  //Create section
	  const newSection=await Section.create({sectionName});
  
	  //Updating course with section objectId
	  const updatedCourseDetails=await Course.findByIdAndUpdate(
		courseId,
		{
		  $push: {
			courseContent: newSection._id
		  }
		},
		{
		  new:true,
		}
	  ).populate({ path: "courseContent", populate: {path: "subSection"} }).exec();
  
	  //Returning response
	  return res.status(201).json({
		success:true,
		message: "Section created successfully",
		updatedCourseDetails,
	  });
	} catch(err){
	  return res.status(500).json({
		success:false,
		message:"Error while creating section",
	  })
	}
}

// UPDATE a section
exports.updateSection = async (req, res) => {
	try{
	  //Data input
	  const {sectionName, sectionId, courseId} = req.body;
  
	  //Data validation
	  if (!sectionName || !sectionId) {
		return res.status(400).json({
		  error: "Please provide section name and course id"
		});
	  }
  
	  //Update data
	  const section=await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
  
	  const course = await Course.findById(courseId)
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
  
	  //Returning response
	  return res.status(200).json({
		success: true,
		message: section,
		data: course
	  });
  
	} catch(err){
	  return res.status(500).json({
		success:false,
		message:"Error while updating section",
	  });
	}
}

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		const { sectionId } = req.params;
		await Section.findByIdAndDelete(sectionId);
		res.status(200).json({
			success: true,
			message: "Section deleted",
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};