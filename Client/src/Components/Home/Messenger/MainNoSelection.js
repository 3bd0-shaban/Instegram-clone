import React from 'react'
import { IoMdPaperPlane } from 'react-icons/io'

const MainNoSelection = () => {
  return (
    <div>
    <div className='flex mt-28 justify-center items-center h-[60vh] '>
        <div className='border-black border-[3px] flex items-center rounded-full p-7'>
            <IoMdPaperPlane size={60} />
        </div>
    </div>
    <div className='my-8'>
        <div className='block text-center space-y-5'>
            <p className='block font-bold text-4xl'>Your Messages</p>
            <p>Send private photos and messages to a friend or group.</p>
        </div>
    </div>
</div>
  )
}

export default MainNoSelection
