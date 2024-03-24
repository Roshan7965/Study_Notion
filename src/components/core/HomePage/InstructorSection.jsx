import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import {FaArrowRight} from 'react-icons/fa'


const InstructorSection = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-20 items-center '>
			<div className='lg:w-[50%]'>
				<img src={Instructor} className='shadow-white shadow-[-20px_-20px_0_0]' />
			</div>
			<div className='lg:w-[50%] flex gap-10 flex-col'>
				<div className='lg:w-[50%] text-4xl font-semibold '>
					Become an <HighlightText text={"instructor"} />
				</div>
				<div className='font-medium text-[16px] text-justify w-[90%] text-richblack-300'>
					Instructors from around the world teach millions of students on
					StudyNotion. We provide the tools and skills to teach what you love.
				</div>
				<div className='w-fit ml-20 md:ml-0'>
					<CTAButton active={true} linkto={"/signup"}>
						<div className="flex items-center gap-3">
							Start Teaching today
							<FaArrowRight />
						</div>
					</CTAButton>
				</div>
			</div>
		</div>
  )
}

export default InstructorSection