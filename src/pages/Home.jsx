import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import Banner from '../assets/Images/banner.mp4'
import ReviewSlider from '../components/common/ReviewSlider'
// import Office from '../assets/Images/boxoffice.png'

const Home = () => {
  return (
    <div>
        {/*Section - 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full text-richblack-200 bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses,you can lear at your own pace,from anywhere in the world, and get access to a <br/>
                wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/signup"}>Book a Demo</CTAButton>
            </div>

            <div className='mx-3 my-12 shadow-blue-200 w-[80%] drop-shadow-lg'>
                <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]"><source src={Banner} type='video/mp4'/></video>
            </div>

            {/* Code Section - 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={<div className='text-4xl font-semibold'>Unlock your 
                                    <HighlightText text={"coding potential"}/> {" "} <br/>
                                    with our online courses.
                            </div>}
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head> <title>Example</title>\n<link rel="stylesheet"href="styles.css">
                                </head>\n<body>\n<h1><a href="/">Header</a></h1>
                                <nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* Code Section - 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className="w-[100%] text-4xl font-semibold lg:w-[40%] ">Start
                            <HighlightText text={"coding in seconds"} />
                        </div>
                            }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeColor={"text-white"}
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

            <div>
                <ExploreMore/>
            </div>
            <br />
            <br />
            <br /><br /><br /><br />


        </div>

        {/*Section - 2 */}
       <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[333px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='md:h-[50px]'></div>
                        <div className='flex flex-row gap-7 text-white items-center'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Learn More
                                </div>
                            </CTAButton>     
                            

                        </div>

                    </div>

            </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-16 mx-auto mt-14'>
                    <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                         <div className='md:w-[50%] font-semibold text-4xl'>
                            Get the skills you need for a
                            <HighlightText text={"Job that is in demand"}/>
                         </div>

                        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                            <div className='text-[16px]'>
                                The modern StudyNotion dictates its own terms. Today, to be competitive specialist requires more than professional skills.
                            </div>
                            <div className='lg:w-[30%]'> <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton></div>
                        </div>
                    </div>

                    <TimelineSection/>
                    <LearningLanguageSection/>
            </div>

            

       </div>

         {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <InstructorSection/>
            <h2 className="text-center text-4xl font-semobold mt-10">
                Reviews from Other Learners
            </h2>
        <ReviewSlider />
      </div>

        {/*Footer */}
        <Footer/>

    </div>
  )
}

export default Home