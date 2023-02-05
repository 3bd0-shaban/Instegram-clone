import React from 'react'
import { BsX } from 'react-icons/bs'

const VideoStory = () => {
    return (
        <>
            <div className='fixed inset-0 bg-[#1A1A1A]'></div>

            <div className='h-[20vh] text-white p-5 w-full fixed flex justify-between z-10'>
                <img className="h-8 " src="/Images/Font.png" alt="" />
                <BsX size={30} />
            </div>
            <div className='h-[100vh] fixed inset-x-0 duration-700 container px-0 cursor-pointer max-w-full  md:max-w-xl flex items-center'>
                <div className='h-[100%] md:h-[75%] container cursor-pointer md:max-w-2xl flex items-center rounded-xl bg-white'>

                </div>
            </div>
        </>
    )
}

export default VideoStory
