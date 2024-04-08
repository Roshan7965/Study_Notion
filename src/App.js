import "./App.css";
import {Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { setUserReal } from "./slices/profileSlice";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import { ACCOUNT_TYPE } from "./utils/constants";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "../src/components/core/Dashboard/Settings/index"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Index";
import Instructor from "./components/core/Dashboard/Instructor";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetail";
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails' 

function App() {
  const { token } = useSelector((state) => state.auth)
  const [userData, setUserData] = useState(null)  
  const dispatch = useDispatch();
  useEffect(()=> {
    const setData = async() => {
      const decodedToken = await jwtDecode(token)
      if(decodedToken !== userData){
        setUserData(decodedToken)
        dispatch(setUserReal(decodedToken))
      }
    }
    if(token){
      setData();
    }
  }, [token])
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/catalog/:catalogName" element={<Catalog />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      
       {/* Open Route - for Only Non Logged in User */}
       <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route element={<PrivateRoute> <Dashboard/></PrivateRoute>}>
            {/* Route for all users */}
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />


             {/* ********************************************************************************************************
                                                      ROUTES FOR STUDENT
            ******************************************************************************************************** */}
            {
              userData?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

            


            {/* ********************************************************************************************************
                                                      ROUTES FOR INSTRUCTOR
            ******************************************************************************************************** */}
            {
              userData?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                </>
              )
            }

        </Route>

        <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
                {
                  userData?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                      <Route
                        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<VideoDetails />}
                      />
                    </>
                  )
                }
          </Route>
        
        <Route
          path="*"
          element={<Error />}
        />
    </Routes>

   </div>
  );
}

export default App;
