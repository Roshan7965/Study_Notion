const express = require("express");
const app = express();

// require("dotenv").config();
const userRoutes = require("./routes/User");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payments");
const courseRoute = require("./routes/Course");

const cookieParser = require("cookie-parser");
const cors  = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000;

//Database Connection
const db = require("./config/database");
db.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)

//cloudinary connection
cloudinaryConnect();

//routes mount
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/course",courseRoute);

//default
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is running..."
    })
})

app.listen(PORT,()=>{
    console.log(`Server Connected successfully at ${PORT}`);
})