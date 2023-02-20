import React from 'react'
import { FiSend } from 'react-icons/fi'

const EmptySendChat = () => {
    return (

        <div className='text-center items-center flex h-full'>
            <div className='mx-auto mb-3'>
                <div className='text-7xl text-gray-500 flex justify-center'>
                    <FiSend />
                </div>
                <p className='text-2xl font-light mb-3'>Your Masseges</p>
                <p className='font-normal mb-3 text-gray-400'>Send private photos and messages to a friend or group.</p>
                <button className='bg-blue-500 rounded-md text-base font-medium text-white py-1 mb-3 focus:bg-blue-400 px-3'>Send Message</button>
            </div>
        </div>
    )
}

export default EmptySendChat
