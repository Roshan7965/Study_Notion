const express = require("express")
const router = express.Router();

const { addToCart, removeFromCart } = require("../controllers/Cart")


//Import Course controller
const {createCourse,getAllCourses,getCourseDetails,getInstructorCourses,editCourse,deleteCourse,getFullCourseDetails} = require("../controllers/Course");

//Import Course Progress
const {updateCourseProgress} = require("../controllers/courseProgress")

//Import Category controller
const {createCategory,showAllCategory,categoryPageDetails} = require("../controllers/Category");

//Import Section Controllers
const {createSection,updateSection,deleteSection} = require("../controllers/Section");

//Import Sub-Section Controllers
const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/Subsection");

//Import RatingAndReview Controllers
const {createRating,getAverageRating,getAllRatingAndReview} = require("../controllers/RatingAndReview");

//Import middlewares
const {auth,isStudent,isInstructor,isAdmin} = require("../middlewares/authorization");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse",auth,isInstructor,createCourse)
//Add Section to Course
router.post("/addSection",auth,isInstructor,createSection)
//Update a Section
router.post("/updateSection",auth,isInstructor,updateSection)
//Delete a section
router.post("/deleteSection",auth,isInstructor,deleteSection)
//Add a subSection to a Section
router.post("/addSubSection",auth,isInstructor,createSubSection)
//Edit SUb Section
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
//Delete Sub Section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
//Get all Registered Course
router.get("/getAllCourses",getAllCourses);
//Get Details for a specific Course
router.post("/getCourseDetails",getCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.post("/editCourse", auth, isInstructor, editCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)




// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingAndReview);


router.post("/addToCart", auth, isStudent, addToCart)
router.post("/removeFromCart", auth, isStudent, removeFromCart)


module.exports = router
