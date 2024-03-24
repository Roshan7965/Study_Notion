import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-5 mt-[120px] mb-32">

        <div className="text-4xl font-semibold text-center my-10">
          Your Swiss Knife for
          <HighlightText text={"learning any language"}/>
        </div>

        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy with 20+ languages realistic voice-over,
          progress tracking,custom schedule and more
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img
            src={know_your_progress}
            alt="KNowYourProgressImage"
            className="object-contain  lg:-mr-32  "
          />
          <img
            src={compare_with_others}
            alt="KNowYourProgressImage"
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={plan_your_lesson}
            alt="KNowYourProgressImage"
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
			  </div>
        <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5t">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
			  </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection