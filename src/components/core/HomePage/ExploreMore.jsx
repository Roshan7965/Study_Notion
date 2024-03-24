import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.find((course) => course.tag === value);
        if (result) {
            setCourses(result.courses);
            setCurrentCard(result.courses[0].heading); // Set the current card to the first course's heading
        } else {
            // Handle case where no matching tab is found
            setCourses([]);
            setCurrentCard('');
        }
    }

  return (
    <div>
      <div className='text-3xl md:text-4xl font-semibold text-center'>Unlock the <HighlightText text={"Power of Code"} /></div>
      <div className='text-center text-richblack-300 text-lg mt-3'>Learn to Build Anything You Can Imagine</div>
      <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100
      px-1 py-1'>
        {
          tabsName.map((ele, index) => {
            return (
              <div className={`text-[10px] md:text-[16px] flex flex-row items-center gap-2 
                ${currentTab === ele 
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                key={index}
                onClick={()=>setMyCards(ele)}
                >
                {ele}
              </div>
            );
          })
        }
      </div>
        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[60%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
          {courses.map((ele, index) => {
            return (
              <CourseCard
                key={index}
                cardData={ele}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
    </div>
  )
}

export default ExploreMore