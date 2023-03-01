import React from 'react'

const SkilSuggestion = () => {
    return (
        <div className='hidden lg:flex items-center justify-between lg:px-5'>
            <div className='flex items-center gap-2'>
                <div className="rounded-full bg-gray-200 w-12 h-12 "></div>
                <div className='space-y-2'>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
    )
}

export default SkilSuggestion
