import React from 'react'

const SkilReelVideo = () => {
    return (
        <>
            <div className='absolute w-full p-3 lg:p-5 flex justify-between '>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-gray-200'></div>
                    <div className='w-32 h-5 rounded-md bg-gray-200'></div>
                </div>
                <div className='w-12 h-12 rounded-full bg-gray-200'></div>
            </div>
            <div className='absolute bottom-0 mb-14 px-2 lg:px-5 flex justify-between items-end  w-full text-gray-400'>
                <div className='flex items-center gap-2'>
                    <div className="rounded-full bg-gray-200 w-12 h-12 "></div>
                    <div className='space-y-2'>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                        <div className="h-2 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className='space-y-5 flex-col justify-center'>
                    <div className='h-10 w-10 rounded-full mx-auto bg-gray-200'></div>
                    <div className='h-10 w-10 rounded-full mx-auto bg-gray-200'></div>
                    <div className='h-8 w-5 rounded-md mx-auto bg-gray-200'></div>
                    <div className='h-10 w-10 rounded-md mx-auto bg-gray-200'></div>
                </div>
            </div>
        </>
    )
}

export default SkilReelVideo
