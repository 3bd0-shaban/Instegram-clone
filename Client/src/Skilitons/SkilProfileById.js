import React from 'react'

const SkilProfileById = () => {
    return (
        <div className='container px-0 max-w-[75rem] pt-14 lg:mt-0 mt-5'>
            <div className='container px-.5 max-w-[40rem] px-5 '>
                <div className='flex px-2 gap-3 sm:gap-24 lg:justify-center items-center mb-8'>
                    <div className="py-10 rounded-md w-full">
                        <div className="animate-pulse w-full flex gap-3 lg:gap-16">
                            <div className="rounded-full bg-gray-200 w-40 h-40 lg:w-48 lg:h-48 "></div>
                            <div className="space-y-6 flex-1 py-1">
                                <div className="h-10 w-full bg-gray-200 rounded"></div>
                                <div className="flex w-full gap-5">
                                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-10 w-full bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div><hr className='py-3' />
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
        </div>

    )
}

export default SkilProfileById
