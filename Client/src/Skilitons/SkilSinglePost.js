import React from 'react'

const SkilSinglePost = () => {
    return (
        <div className='container max-w-[22.5rem] xsm:max-w-[24rem] sm:max-w-xl pt-5 lg:mt-0 mt-5 px-0'>
            <div className='container px-1 max-w-[40rem]'>
                <div className='flex justify-between items-center lg:px-1'>
                    <div className='flex items-center gap-2'>
                        <div className="rounded-full bg-gray-200 w-12 h-12 "></div>
                        <div className='space-y-2'>
                            <div className="h-3 w-28 bg-gray-200 rounded"></div>
                            <div className="h-2 w-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="h-2 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className='flex gap-3 sm:gap-24 lg:justify-center items-center mb-2'>
                    <div className="py-3 rounded-md w-full">
                        <div className="animate-pulse w-full flex gap-3 lg:gap-16">
                            <div className="space-y-6 flex-1 py-1">
                                <div className="h-96 w-full bg-gray-200 rounded"></div>
                                <div className="flex justify-between w-full gap-5">
                                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-10 w-full bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div><hr className='py-3' />
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div><hr />
        </div>
    )
}

export default SkilSinglePost
