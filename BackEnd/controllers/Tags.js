const Category = require("../models/Category");


//Create Category
exports.createCategory = async (req,res) => {

    try{
        //fetch data
        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Both fields are required"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Get ALl Categories
exports.showAllCategory = async (req,res) =>{
    try{
        const allCategories = await Category.find({},{name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"All Category Fetched Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

