import ErrorImg from '../assets/Images/Error.png'
import CTAButton from '../components/core/HomePage/Button'
import {FaArrowRight} from 'react-icons/fa'

function Error() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-x-24 p-4 w-full min-h-screen text-richblack-100">
      <div className='w-[250px] mb-8 sm:w-[408px] sm:mb-0'>
        <img src={ErrorImg} />
      </div>
      <div className='flex flex-col justify-center items-center text-center sm:items-start sm:text-left'>
        <h1 className='text-[1.25rem] font-semibold mb-4 sm:text-[2.75rem]'>Lost and not found!</h1>
        <div className='mb-8'>
          <p className='font-normal text-lg text-slate-400  '>Seems like we couldn’t find the page you were looking for.</p>
        </div>
        <CTAButton active={true} linkto={"/"}>
                                <div className='flex items-center gap-3'>
                                    Go To Homepage
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
      </div>
    </div>
  );
}

export default Error;